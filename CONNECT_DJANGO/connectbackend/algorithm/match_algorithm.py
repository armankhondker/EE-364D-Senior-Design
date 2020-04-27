from pymongo import MongoClient
from base64 import b64decode
from .utility import convert_pdf_to_txt, engage_student_match  # add . for aws
from .api_keys import sendinblue_key  # add . for aws
import os
import warnings
import pandas as pd
import pprint
import json
import requests


def run_algo(pre_matches={}, email_address=""):
    client = MongoClient(
        "mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority")
    db = client
    students = list(db.students.students_student.find({}))
    resumes = list(db.students.students_resume.find({}))
    orgs = list(db.students.organizations_project.find({}))
    cohort = ""
    student_data = []
    org_data = []
    time_commitment_dict = {
        'Less than 5 Hours Per Week': 0,
        '5-10 Hours Per Week': 1,
        '15-20 Hours Per Week': 2,
        '20-30 Hours Per Week': 3
    }
    ###### Handle pre_matches

    org_prematches = {}

    ############### Data Preprocessing
    for student in students:
        cohort = student['cohort']  # define cohort
        resume = ""
        r = next((item for item in resumes if item["unique_id"] == student['unique_id']), "")
        # Create pdf of resume from base64, parse text, delete resume
        if r != "":
            data_uri = r['data']
            header, encoded = data_uri.split(",", 1)
            data = b64decode(encoded)
            pdf_name = r['unique_id'] + ".pdf"
            with open(pdf_name, "wb") as f:
                f.write(data)
            r = convert_pdf_to_txt('./' + pdf_name)
            r = r.replace("\t", " ")
            r = r.split("\n")
            try:
                os.remove('./' + pdf_name)
            except OSError as e:
                print("Error: %s : %s" % (file_path, e.strerror))

        temp_dict = {
            'name': student['first_name'] + ' ' + student['last_name'],
            'skills': {**student['prof_skills'], **student['tech_skills']},
            'time_commitment': student['time_commitment'],
            'work_remotely': student['work_remotely'],
            'transportation': student['transportation'],
            'flexible_hours': student['flexible_hours'],
            'unique_id': student['unique_id'],
            'cohort': student['cohort'],
            'resume': r,
            'org_df': pd.DataFrame(columns=['ids', 'raw_scores', 'matchability']),
            'engaged': False,
            'index': 0,
            'org_rank': -1,
            'pre_matched': False
        }
        if (student['unique_id'] in pre_matches):
            org_prematches.update({pre_matches[student['unique_id']]: {'student_id': student['unique_id'],
                                                                       'name': student['first_name'] + ' ' + student[
                                                                           'last_name']}})
            temp_dict.update({'pre_matched': True})
            temp_dict.update({'engaged': True})
        ### Resume scoring
        if (r != ""):
            for skill in temp_dict['skills']:
                for text_line in r:
                    if skill.lower() in text_line.lower():
                        score = get_pdf_score(text_line)
                        temp_dict['skills'][skill] += score

        student_data.append(temp_dict)

    for org in orgs:
        possible_students = []
        o_flexible_hours = org['flexible_hours']
        o_time_commitment = org['time_commitment']
        o_work_remotely = org['work_remotely']
        o_transporation = org['transportation']

        # Deal Breakers
        for student in student_data:
            s_flexible_hours = student['flexible_hours']
            s_time_commitment = student['time_commitment']
            s_work_remotely = student['work_remotely']
            s_transportation = student['transportation']
            s_pre_matched = student['pre_matched']
            if (s_pre_matched):
                continue
            elif (not s_work_remotely and o_work_remotely):
                continue
            elif (s_flexible_hours and not o_flexible_hours):
                continue
            elif (time_commitment_dict[s_time_commitment] < time_commitment_dict[o_time_commitment]):
                continue
            elif (not s_transportation and o_transporation):
                continue
            else:
                possible_students.append(student)

        # Init dict
        temp_dict = {
            'name': org['project_name'],
            'skills': {**org['prof_skills'], **org['tech_skills']},
            'time_commitment': org['time_commitment'],
            'work_remotely': org['work_remotely'],
            'flexible_hours': org['flexible_hours'],
            'transportation': org['transportation'],
            'unique_id': org['unique_id'],
            'cohort': org['cohort'],
            'resume': r,
            'engaged': False,
            'index': 0,
            'possible_students': possible_students,
            'match': {'name': 'NO MATCH', 'unique_id': '-1'},
            'pre_matched': False
        }
        if (org['unique_id'] in org_prematches):
            sid = org_prematches[org['unique_id']]['student_id']
            sname = sid = org_prematches[org['unique_id']]['name']
            temp_dict.update({'match': {'name': sname, 'unique_id': sid}})
            temp_dict.update({'pre_matched': True})
            temp_dict.update({'engaged': True})
        org_data.append(temp_dict)
    #############################################

    ###### Score Matchability

    # Score matchability
    for org in org_data:
        org_id = org['unique_id']
        org_df = pd.DataFrame()
        org_matchability = 0
        org_skills = org['skills']
        for skill in org_skills:
            org_skill = org_skills[skill]
            if org_skill < 3:
                continue
            mult = org_skill - 2
            if (org_skill == 4 or org_skill == 5):
                org_matchability += mult * 4
            else:
                org_matchability += mult * 3
        possible_students = org['possible_students']
        if org_matchability == 0:
            org_matchability += 1
        for student in possible_students:
            student_matchability = 0
            student_skills = student['skills']
            for skill in org_skills:
                org_skill = org_skills[skill]
                if (org_skill >= 3):
                    mult = org_skill - 2
                    score=0
                    try:
                        score = student_skills[skill]
                    except:
                        print("Student did not have this skill")
                    student_matchability += mult * score
            temp_df = pd.DataFrame()
            temp_df['ids'] = [org_id]
            temp_df['raw_scores'] = [student_matchability]
            temp_df['matchability'] = [student_matchability / org_matchability]
            student['org_df'] = student['org_df'].append(temp_df, ignore_index=True)

    ######## Sort by matchability, students sort by raw score, org scores by matchability
    for student in student_data:
        student['org_df'] = student['org_df'].sort_values(by=['raw_scores', 'matchability'],
                                                          ascending=False).reset_index(drop=True)

    for org in org_data:
        org_id = org['unique_id']
        poss_students = org['possible_students']
        x = poss_students[0]
        org['possible_students'] = sorted(poss_students, key=lambda x: (
            float((x['org_df'].loc[x['org_df']['ids'] == org_id]['matchability']).astype(float))), reverse=True)

    ########## Run Algo

    numEngaged = 0
    numOrgs = len(org_data)
    index = 0

    while (numEngaged < numOrgs - len(pre_matches)):
        for org in org_data:
            if (org['engaged'] or org['pre_matched']):
                continue
            poss_students = org['possible_students']
            i = org['index']
            while (True):
                if (i >= len(poss_students)):
                    org['match'] = {'name': 'NO MATCH', 'unique_id': '-1'}
                    numEngaged += 1
                    break
                student = poss_students[i]
                result, numAdded = engage_student_match(student, org, org_data)
                numEngaged += numAdded
                if (result):
                    org['index'] = i + 1
                    break
                else:
                    i += 1
    ########## Algo done

    results_arr = []
    email = "<p>---------------------------------</p>"
    for org in org_data:
        if (org['match']['unique_id'] == '-1'):
            temp_obj = {
                'org_name': org['name'],
                'student_name': org['match']['name'],
                'possible_students': org['possible_students']
            }
        else:
            stud = org['match']
            org_id = org['unique_id']
            temp_obj = {
                'org_name': org['name'],
                'student_name': stud['name'],
                'org_skills': org['skills'],
                'student_skills': stud['skills'],
                'student_matchability': float(
                    (stud['org_df'].loc[stud['org_df']['ids'] == org_id]['matchability']).astype(float))
            }
        results_arr.append(temp_obj)

        print(org['name'])
        print(" matched with ")
        print(org['match']['name'])
        email += "<p>" + org['name'] + " matched with " + org['match']['name'] + "</p>"
        if (org['match']['name'] == 'NO MATCH'):
            print("Possible Students:")
            email += "<p>Possible Students:</p>"
            for s in org['possible_students']:
                print(s['name'])
                email += "<p>" + s['name'] + "</p>"
        print("---------------------------------")
        email += "<p>---------------------------------</p>"

    ####### Post to DB
    api_link = 'http://django-env.emqvqmazrh.us-west-2.elasticbeanstalk.com/api/results/'
    params = {
        'cohort': cohort,
        'data': {'data_list': results_arr}
    }
    headers = {
        "content-type": "application/json",
        "accept": "application/json",
    }
    body = json.dumps(params) if params else None

    response = requests.post(
        api_link, data=body, headers=headers
    )

    if (email_address == ""):
        email_address = "jpaper01@gmail.com"
    #### Send email
    api_link = "https://api.sendinblue.com/v3/smtp/email"
    body_dict = {
        "sender": {"name": "RGKConnect", "email": "rgkconnectmatching@gmail.com"},
        "subject": "Current matching",
        "to": [{"email": email_address}],
        "htmlContent": email,
    }

    headers = {
        "content-type": "application/json",
        "api-key": sendinblue_key,
        "accept": "application/json",
    }

    body = json.dumps(body_dict) if body_dict else None

    response = requests.post(
        api_link, data=body, headers=headers
    )
    pprint.pprint(response.json())
