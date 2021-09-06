from bs4 import BeautifulSoup
from pprint import pprint
import json

with open("publications.html", "r") as fp:
    html_doc=fp.read()

soup = BeautifulSoup(html_doc, 'html.parser')

data = []
for i in soup.find_all("li"):
    rec = {}
    rec["title"] = i.b.text
    if i.a is not None:
        rec["pdf"]  = i.a["href"]
    else:
        rec["pdf"]  = "TBD"
    rec["venue"] = i.i.text
    rec["year"] = int(i.contents[-1].lstrip(", ").rstrip(",. \n"))
    foundbr = False
    for child in i.contents:
        #pprint("child: " + str(child.name))
        if foundbr:
            rec["authors"] = [ x.lstrip() for x in str(child).rstrip(". \n").lstrip(" \n").replace(" and ", ",").split(",")]
            #pprint(child)
            break
        if str(child.name)=="br":
            foundbr = True
    data.append(rec)

print(json.dumps(data, indent=2))
