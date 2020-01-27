from pymongo import MongoClient
from utility import engageStudentMatch
import warnings

def run_algo(pre_matches):
    categories = []
    student = {
        'name': 'N/A',
        'skills': {
            'Java' : 0
        },
        'pre_match': 'N/A',
        'engaged': 'N/A',
        'match' : 'N/A',
        'preferences': []
    }
    org = {
        'name': 'N/A',
        'skill_requirements': {
            'Java' : 0
        },
        'pre-match': 'N/A',
        'engaged': 'N/A',
        'match': "N/A"
        'qualified': []
        'unqualified': []
    }
