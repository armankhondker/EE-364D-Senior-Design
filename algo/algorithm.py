from pymongo import MongoClient

client = MongoClient("mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority")
db = client
students = list(db.students.student_data.find({}))

orgs = list(db.organizations.project_rankings.find({}))
#print(q1aStudents[0]['Quadrant'])
orgToStudents = []
studentToOrgs = []
for org in orgs:
    p1 = org['Primary Project Type']
    p2 = org['Secondary Project Type']
    p1.replace(" ", "")
    p2.replace(" ", "")
    tmp = []
    for student in students:
        interests = student['Buckets of interest']
        if ((p1 in interests and p1 != "") or (p2 in interests and p2 != "")):
            tmp.append(student)
    orgToStudents.append({'org' : org, 'students': tmp})

for student in students:
    interests = student['Buckets of interest']
    tmp = []
    for org in orgs:
        p1 = org['Primary Project Type']
        p2 = org['Secondary Project Type']
        p1.replace(" ", "")
        p2.replace(" ", "")
        interests = student['Buckets of interest']
        if ((p1 in interests and p1 != "") or (p2 in interests and p2 != "")):
            tmp.append(org)
    studentToOrgs.append({'student' : student, 'orgs': tmp})

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
    else:
        qualified.sort(key=lambda student: float(student['Professional']), reverse=True)
        profq.sort(key=lambda student: float(student['Professional']), reverse=True)
        techq.sort(key=lambda student: float(student['Professional']), reverse=True)
        unq.sort(key=lambda student: float(student['Professional']), reverse=True)
    org['qualified'] = qualified
    org['profq'] = profq
    org['techq'] = techq
    org['unq'] = unq

print(orgToStudents[0])
