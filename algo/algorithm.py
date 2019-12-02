from pymongo import MongoClient
from utility import engageStudentMatch
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)


client = MongoClient("mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority")
db = client
students = list(db.students.student_data.find({}))

orgs = list(db.organizations.project_rankings.find({}))
orgToStudents = []
studentToOrgs = []

#Assign students that are interested in org
for org in orgs:
    p1 = org['Primary Project Type']
    p2 = org['Secondary Project Type']
    p1.replace(" ", "")
    p2.replace(" ", "")
    tmp = []
    org['engaged'] = False
    org['index'] = 0
    for student in students:
        interests = student['Buckets of interest']
        if ((p1 in interests and p1 != "") or (p2 in interests and p2 != "")):
            tmp.append(student)
    orgToStudents.append({'org' : org, 'students': tmp})

#Assign orgs that student is interested in
for student in students:
    interests = student['Buckets of interest']
    tmp = []
    student['engaged'] = False
    for org in orgs:
        p1 = org['Primary Project Type']
        p2 = org['Secondary Project Type']
        p1.replace(" ", "")
        p2.replace(" ", "")
        interests = student['Buckets of interest']
        if ((p1 in interests and p1 != "") or (p2 in interests and p2 != "")):
            tmp.append(org)
    studentToOrgs.append({'student' : student, 'orgs': tmp})

#Bucket students into qualified groups for each org
for org in orgToStudents:
    tech = org['org']
    prof = org['org']
    tech = float(tech['Technical '])
    prof = float(prof['Professional'])
    qualified = []
    profq = []
    techq = []
    unq = []
    for student in org['students']:
        st = float(student['Technical'])
        sp = float(student['Professional'])
        if (st >= tech and sp >= prof):
            qualified.append(student)
        elif (st >= tech):
            techq.append(student)
        elif (sp >= prof):
            profq.append(student)
        else:
            unq.append(student)
    #Sorts within buckets by whichever category is more important
    #Will need to change this to be more detailed
    if (tech >= prof):
        qualified.sort(key=lambda student: float(student['Technical']), reverse=True)
        profq.sort(key=lambda student: float(student['Technical']), reverse=True)
        techq.sort(key=lambda student: float(student['Technical']), reverse=True)
        unq.sort(key=lambda student: float(student['Technical']), reverse=True)
        org['sortedStudents'] = qualified + techq + profq + unq

    else:
        qualified.sort(key=lambda student: float(student['Professional']), reverse=True)
        profq.sort(key=lambda student: float(student['Professional']), reverse=True)
        techq.sort(key=lambda student: float(student['Professional']), reverse=True)
        unq.sort(key=lambda student: float(student['Professional']), reverse=True)
        org['sortedStudents'] = qualified + profq + techq + unq

#Score qualification for each student
for dict in studentToOrgs:
    student = dict['student']
    tech = float(student['Technical'])
    prof = float(student['Professional'])
    orgs = dict['orgs']
    qualified = []
    profq = []
    techq = []
    unq = []
    for org in orgs:
        oTech = float(org['Technical '])
        oProf = float(org['Professional'])
        if (tech >= oTech and prof >= oProf):
            qualified.append(org)
        elif (tech >= oTech):
            techq.append(org)
        elif (prof >= oProf):
            profq.append(org)
        else:
            unq.append(org)
    if (tech >= prof):
        qualified.sort(key=lambda org: float(org['Technical ']), reverse=True)
        profq.sort(key=lambda org: float(org['Technical ']), reverse=True)
        techq.sort(key=lambda org: float(org['Technical ']), reverse=True)
        unq.sort(key=lambda org: float(org['Technical ']), reverse=True)
        student['sortedOrgs'] = qualified + techq + profq + unq
    else:
        qualified.sort(key=lambda org: float(org['Professional']), reverse=True)
        profq.sort(key=lambda org: float(org['Professional']), reverse=True)
        techq.sort(key=lambda org: float(org['Professional']), reverse=True)
        unq.sort(key=lambda org: float(org['Professional']), reverse=True)
        student['sortedOrgs'] = qualified + techq + profq + unq

numEngaged = 0
numOrgs = len(orgToStudents)
index = 0
while(numEngaged < numOrgs):
    for dict in orgToStudents:
        org = dict['org']
        if (org['engaged'] == True):
            continue
        list = dict['sortedStudents']
        i = org['index']
        while(True):
            if (i >= len(list)):
                org['match'] = "NO MATCH FOUND -- NEED TO FIX"
                numEngaged +=1
                break
            student = list[i]
            result, numAdded = engageStudentMatch(student, org)
            numEngaged += numAdded
            if (result):
                org['index'] = i+1
                break
            else:
                i += 1

qualified=0
averageTechScoreAboveOrg = 0
averageProfScoreAboveOrg = 0
averageTechScore = 0
averageProfScore = 0

print("Length of orgs: " + str(len(orgToStudents)))
print("Number of students: " + str(len(students)))
print("##################################################")
collection = db.students.algo_results
collection.drop()
for x in orgToStudents:
    org = x['org']
    index = org['index']
    tech = org['Technical ']
    prof = org['Professional']
    students = x['sortedStudents']
    st = students[index-1]
    realMatches = db.students.results_matching.find({"project_org" : str(org['Org/Project'])})
    # realMatch = list()
    stech = st['Technical']
    sprof = st['Professional']
    st = float(stech)
    ot = float(tech)
    sp = float(sprof)
    op = float(prof)
    if (st >= ot and sp >= op):
        qualified += 1
    averageTechScore += st
    averageProfScore += sp
    averageTechScoreAboveOrg += (st - ot)
    averageProfScoreAboveOrg += (sp - op)
    print("Org: " + org['Org/Project'] + " | Org tech: " + tech + " | Org Prof: " + prof)
    print("Ranked Match Index: " + str(index))
    print("Matched by algo with: ")
    print("Name: " + org['match'] + " | Student tech: " + stech + " | Student prof: " + sprof)
    print("Matched by connect with: ")
    obj = {}
    obj['org'] = org['Org/Project']
    obj['orgTechScore'] = tech
    obj['orgProfScore'] = prof
    obj['match'] = org['match']
    obj['matchTechScore'] = stech
    obj['matchProfScore'] = sprof
    collection.insert_one(obj)
    for y in realMatches:
        match = y['student']
        studentData = db.students.student_data.find({'Name' : match})
        if (studentData.count() > 0):
            data = studentData[0]
            print("Name: " + match + " | tech score: " + data['Technical'] + " | prof score: " + data['Professional'])
        else:
            print("No data for student")
    if (realMatches.count() == 0):
        print("Org name did not match in our database")
    print("##################################################")

averageTechScoreAboveOrg = (averageTechScoreAboveOrg/numOrgs)
averageProfScoreAboveOrg = (averageProfScoreAboveOrg/numOrgs)
averageTechScore = (averageTechScore/numOrgs)
averageProfScore = (averageProfScore/numOrgs)
print("STATS:")
print(str(qualified) + " out of " + str(numOrgs) + " matches were qualified")
print("Average Tech Score of matched student: " + str(averageTechScore))
print("Average Prof Score of matched student: " + str(averageProfScore))
print("Average Tech Score - Org Score: " + str(averageTechScoreAboveOrg))
print("Average Prof Score - Org Score: " + str(averageProfScoreAboveOrg))
