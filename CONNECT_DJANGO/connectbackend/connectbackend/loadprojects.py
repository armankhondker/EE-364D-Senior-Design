from pymongo import MongoClient
from pprint import pprint
import requests

API_ENDPOINT = "http://127.0.0.1:8000/api/projects/"
client = MongoClient(
    'mongodb+srv://rgkadmin:H13seniordesign@cluster0-54uuh.mongodb.net/test?retryWrites=true&w=majority')
db = client["organizations"]
col = db["project_rankings"]

serverStatusResult = db.command("serverStatus")

for match in col.find():
    data = {
        "name": match["Org/Project"],
        "primary": match["Primary Project Type"],
        "secondary": match["Secondary Project Type"],
        "technical": float(match["Technical "]),
        "professional": float(match["Professional"]),
        "quadrant": match["Quadrant"]
    }

    r = requests.post(url=API_ENDPOINT, data=data)

    pprint(r.text)
