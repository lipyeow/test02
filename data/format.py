
import json

with open("pubs0.json", "r") as fp:
    obj = json.load(fp)

for i in obj:
    i["authors"] = ", ".join(i["authors"])

print( json.dumps(obj, indent=2))
