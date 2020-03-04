from pymongo import MongoClient
from utility import engageStudentMatch
import warnings
import pandas as pd

def run_algo(pre_matches):
    categories = []
    student = {
        'id': 0,
        'name': 'N/A',
        'skills': {
            'Java' : 0
        },
        'pre_match': 'N/A',
        'engaged': 'N/A',
        'match' : 'N/A',
        'preferences': [],
        'work_reqs': []
    }
    org = {
        'id': 0,
        'name': 'N/A',
        'skill_requirements': {
            'Java' : 0
        },
        'pre-match': 'N/A',
        'engaged': 'N/A',
        'match': "N/A",
        'qualified': [],
        'unqualified': [],
        'work_reqs': []
    }

    #Temp example
    students = [student]
    orgs = [org]

    for student in students:
        student['org_matchability'] = pd.DataFrame(columns=['ids', 'matchability'])

    # Run through pre match first and remove them from orgs and studentToOrgs

    for org in orgs:
        org_df = pd.DataFrame()
        org_matchability=0
        org_skills = org['skill_requirements']
        for skill in org_skills:
            org_skill = org_skills[skill]
            if org_skill < 3:
                continue
            mult = org_skill-2
            if (org_skill == 4 or org_skill == 5):
                org_matchability += mult*4
            else:
                org_matchability += mult*3
        student_scores=[]
        student_ids = []
        for student in students:
            student_ids.append(student['id'])
            student_matchability = 0
            student_skills = student['skills']
            for skill in org_skills:
                org_skill = org_skills[skill]
                if (org_skill >= 3):
                    mult = org_skill-2
                    score = student_skills[skill]
                    student_matchability += mult*score
            student_scores.append(student_matchability)
            student_df = student['org_matchability']
            student_df['ids'] = student_df['ids'].append(org['id'])
            student_df['matchabililty'] = student_df['matchabililty'].append(student_scores)
        org_df['ids'] = student_ids
        org_df['matchability'] = student_scores/org_matchability
        org['student_df'] = org_df
