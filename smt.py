import json
import random
import requests
from collections import Counter

relations = ["RelatedTo", "FormOf", "IsA", "PartOf" , "HasA", "UsedFor", "CapableOf", "AtLocation",
"Causes", "HasSubevent", "HasFirstSubevent", "HasLastSubevent", "HasPrerequisite", "HasProperty", 
"MotivatedByGoal", "ObstructedBy", "Desires", "CreatedBy", "Synonym", "Antonym", "DistinctFrom", 
"DerivedFrom", "SymbolOf", "DefinedAs", "MannerOf", "LocatedNear", "HasContext", "SimilarTo", 
"EtymologicallyRelatedTo", "EtymologicallyDerivedFrom", "CausesDesire", "MadeOf",
"ReceivesAction", "ExternalURL"]

lg = 'en'
rel = 0
r = 0
tableDict = {}

# Making sure we have 20 different relations
for i in range(0, 21):
    ressources = requests.get('http://api.conceptnet.io/query?rel=/r/'+relations[i]+'&limit=1000')
    obj = ressources.json()

    print("Getting relation " + relations[i] + " (" + str(i) + ")")
    
    for o in obj['edges']:
        
        # rel += 1
        start = o['start']
        end = o['end']

        startLang = False
        endLang = False

        if 'language' in start:
            startLang = start['language'] == lg

        if 'language' in end:
            endLang = end['language'] == lg 

        if startLang and endLang:
            
            # print("Found")
            if len(tableDict) == 0:
                print("Relation found for "+ relations[i] +" with " + start['label'])
                tableDict.update({"start": [start['label']],
                                "relation": [o['rel']['label']],
                                "end": [end['label']]})
                
                break
            else:
                print("Relation found for "+ relations[i] +" with " + start['label'])
                tableDict["start"].append(start['label'])
                tableDict["relation"].append(o['rel']['label'])
                tableDict["end"].append(end['label'])
                break
        
    print("Size of table " + str(len(tableDict['relation'])))

# Filling the remaining with RelatedTo relation
ressources = requests.get('http://api.conceptnet.io/query?rel=/r/RelatedTo&limit=100')
obj = ressources.json()

for o in obj['edges']:

    start = o['start']
    end = o['end']

    startLang = False
    endLang = False

    if 'language' in start:
        startLang = start['language'] == lg 
    if 'language' in end:
        endLang = end['language'] == lg 

    if startLang and endLang and len(tableDict['relation']) <= 100:

        if len(tableDict) == 0:

            tableDict.update({"start": [start['label']],
                            "relation": [o['rel']['label']],
                            "end": [end['label']]})
        else:
            tableDict["start"].append(start['label'])
            tableDict["relation"].append(o['rel']['label'])
            tableDict["end"].append(end['label'])

    if len(tableDict['relation']) > 100:
        break

# Filling the remaining with IsA relation
ressources = requests.get('http://api.conceptnet.io/query?rel=/r/IsA&limit=200')
obj = ressources.json()

for o in obj['edges']:

    start = o['start']
    end = o['end']

    startLang = False
    endLang = False

    if 'language' in start:
        startLang = start['language'] == lg 
    if 'language' in end:
        endLang = end['language'] == lg 

    if startLang and endLang and len(tableDict['relation']) <= 99:

        if len(tableDict) == 0:

            tableDict.update({"start": [start['label']],
                            "relation": [o['rel']['label']],
                            "end": [end['label']]})
        else:
            tableDict["start"].append(start['label'])
            tableDict["relation"].append(o['rel']['label'])
            tableDict["end"].append(end['label'])

    if len(tableDict['relation']) == 100:
        break


print()
print("Final table: ")
print()
print(tableDict)
print()
print("Number of start, relation, end: ")
print(len(tableDict["start"]))
print(len(tableDict["relation"]))
print(len(tableDict["end"]))

print("Unique words in start: ")

c = Counter(tableDict["start"])
print(len(c))


with open("scrap.json","w") as file:
    file.write(json.dumps(tableDict))
