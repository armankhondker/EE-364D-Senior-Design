from pymongo import MongoClient
from pprint import pprint
import requests

API_ENDPOINT = "http://127.0.0.1:8000/api/students/"
client = MongoClient(
    'mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority')
db = client["students"]
col = db["student_data"]

serverStatusResult = db.command("serverStatus")

for match in col.find():
    data = {
        "name": match["Name"],
        "email": "",
        "phone": "",
        "resume_id": match["Resume ID #"],
        "quadrant": match["Quadrant"],
        "technical": float(match["Technical"]),
        "professional": float(match["Professional"]),
        "availability_duration": match["Availability - Duration"],
        "availability_time": match["Availability - time"],
        "work_factors": match["Work factors"],
        "interest_buckets": match["Buckets of interest"],
        "other": match["Other skills/experiences"],
    }

    r = requests.post(url=API_ENDPOINT, data=data)
    # pprint(data)
    pprint(r.text)
