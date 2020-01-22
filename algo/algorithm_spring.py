from pymongo import MongoClient
from utility import engageSpringStudentMatch
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)


client = MongoClient("mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority")
db = client
students = list(db.students.spring_student_data.find({}))

orgs = list(db.students.spring_org_data.find({}))
orgToStudents = []
studentToOrgs = []
#Initialize Dict
for org in orgs:
    tmp = []
    org['engaged'] = False
    org['index'] = 0
    orgToStudents.append({'org' : org, 'students': students})

#Initialize Dict
for student in students:
    tmp = []
    student['engaged'] = False
    student['index'] = 0
    studentToOrgs.append({'student' : student, 'orgs': orgs})

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
    for student in students:
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
            result, numAdded = engageSpringStudentMatch(student, org)
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
for x in orgToStudents:
    org = x['org']
    index = org['index']
    tech = org['Technical ']
    prof = org['Professional']
    students = x['sortedStudents']
    st = students[index-1]
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
    print("Org: " + org['Organization name '] + " | Org tech: " + tech + " | Org Prof: " + prof)
    print("Ranked Match Index: " + str(index))
    print("Matched by algo with: ")
    print("Name: " + org['match'] + " | Student tech: " + stech + " | Student prof: " + sprof)
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
