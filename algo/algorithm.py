from pymongo import MongoClient
from utility import engageMatch

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
            result, numAdded = engageMatch(student, org)
            numEngaged += numAdded
            if (result):
                org['index'] = i+1
                break
            else:
                i += 1
                
print("Length of orgs: " + str(len(orgToStudents)))
print("Number of students: " + str(len(students)))
print("##################################################")
for x in orgToStudents:
    org = x['org']
    index = org['index']
    tech = org['Technical ']
    prof = org['Professional']
    students = x['sortedStudents']
    st = students[index]
    stech = st['Technical']
    sprof = st['Professional']
    print(org['Org/Project'] + " matched with " + org['match'])
    print("Index: " + str(index) + " Org tech: " + tech + " Org Prof: " + prof + " Student tech: " + stech + " Student prof: " + sprof)
    print("##################################################")
