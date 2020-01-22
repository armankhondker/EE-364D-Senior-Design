def engageStudentMatch(student, org):
    # print("Student: " + student['Name'] + " " + str(student['engaged']))
    # print(" Org: " + org['Org/Project'])
    orgRank = -1
    i = 0
    for proj in student['sortedOrgs']:
        if (proj == org):
            orgRank = i
            break
        i += 1
    # print("orgRank: " + str(orgRank))
    if (student['engaged'] == False):
        student['engaged'] = True
        student['orgRank'] = orgRank
        student['match'] = org['Org/Project']
        org['engaged'] = True
        org['match'] = student['Name']
        return True, 1
    else:
        oldRank = student['orgRank']
        if (oldRank > orgRank):
            oldOrg = student['sortedOrgs'][oldRank]
            oldOrg['engaged'] = False
            oldOrg['match'] = ""
            student['engaged'] = True
            student['orgRank'] = orgRank
            student['match'] = org['Org/Project']
            org['engaged'] = True
            org['match'] = student['Name']
            return True, 0
        else:
            return False, 0

def engageSpringStudentMatch(student, org):
    # print("Student: " + student['Name'] + " " + str(student['engaged']))
    # print(" Org: " + org['Org/Project'])
    orgRank = -1
    i = 0
    for proj in student['sortedOrgs']:
        if (proj == org):
            orgRank = i
            break
        i += 1
    # print("orgRank: " + str(orgRank))
    if (student['engaged'] == False):
        student['engaged'] = True
        student['orgRank'] = orgRank
        student['match'] = org['Organization name ']
        org['engaged'] = True
        org['match'] = student['First Name'] + " " + student['Last Name']
        return True, 1
    else:
        oldRank = student['orgRank']
        if (oldRank > orgRank):
            oldOrg = student['sortedOrgs'][oldRank]
            oldOrg['engaged'] = False
            oldOrg['match'] = ""
            student['engaged'] = True
            student['orgRank'] = orgRank
            student['match'] = org['Organization name ']
            org['engaged'] = True
            org['match'] = student['First Name'] + " " + student['Last Name']
            return True, 0
        else:
            return False, 0

def engageOrgMatch(student, org):
    # print("Student: " + student['Name'] + " " + str(student['engaged']))
    # print(" Org: " + org['Org/Project'])
    studentRank = -1
    i = 0
    for proj in org['sortedStudents']:
        if (proj == org):
            studentRank = i
            break
        i += 1
    # print("orgRank: " + str(orgRank))
    if (org['engaged'] == False):
        org['engaged'] = True
        org['studentRank'] = studentRank
        org['match'] = student['Name']
        student['engaged'] = True
        student['match'] = org['Org/Project']
        return True, 1
    else:
        oldRank = org['studentRank']
        if (oldRank > studentRank):
            oldStudent = org['sortedStudents'][oldRank]
            oldStudent['engaged'] = False
            oldStudent['match'] = ""
            org['engaged'] = True
            org['studentRank'] = studentRank
            org['match'] = student['Name']
            student['engaged'] = True
            student['match'] = org['Org/Project']
            return True, 0
        else:
            return False, 0
