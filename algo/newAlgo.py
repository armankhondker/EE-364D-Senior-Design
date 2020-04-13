from pymongo import MongoClient
from utility import engageStudentMatch
import warnings
import pandas as pd
import pprint

client = MongoClient("mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority")
db = client
students = list(db.students.students_student.find({}))
pprint.pprint(students)
student_data = []
for student in students:
    temp_dict = {
        'name': student['first_name'] + ' ' + student['last_name'],
        'skills': student['prof_skills'].extend(student['tech)skills']),
        'time_commitment': student.['time_commitment'],
        'transportation': student['transportation'],
        'unique_id': student['unique_id'] ,
        'cohort': student['cohort']
    }


def run_algo(pre_matches):
    return
