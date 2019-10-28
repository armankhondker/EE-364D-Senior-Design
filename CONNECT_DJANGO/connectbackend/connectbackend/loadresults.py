from pymongo import MongoClient
from pprint import pprint
import requests

API_ENDPOINT = "http://127.0.0.1:8000/api/matchings/"
client = MongoClient('mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority')
db = client["students"]
col = db["matching_results"]

serverStatusResult = db.command("serverStatus")

for match in col.find():
    data = {
        "project_org": match["ORG/PROJECT"],
        "student": match["STUDENT MATCH"]
    }

    r = requests.post(url = API_ENDPOINT, data = data)

    pprint(r.text)

