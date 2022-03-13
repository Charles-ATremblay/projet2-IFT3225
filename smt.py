import random
import requests


relations = ["RelatedTo", "FormOf", "IsA", "PartOf" , "HasA", "UsedFor", "CapableOf", "AtLocation",
"Causes", "HasSubevent", "HasFirstSubevent", "HasLastSubevent", "HasPrerequisite", "HasProperty", 
"MotivatedByGoal", "ObstructedBy", "Desires", "CreatedBy", "Synonym", "Antonym", "DistinctFrom", 
"DerivedFrom", "SymbolOf", "DefinedAs", "MannerOf", "LocatedNear", "HasContext", "SimilarTo", 
"EtymologicallyRelatedTo", "EtymologicallyDerivedFrom", "CausesDesire", "MadeOf",
"ReceivesAction", "ExternalURL"]

for i in range(0, 20):
    ressources = requests.get('http://api.conceptnet.io/query?rel=/r/'+relations[i]+'&limit=10')
    obj = ressources.json()

    fr = 'fr'   
    en = 'en'
    rel = 0
    r = 0
    tableDict = {}

    for o in obj['edges']:
        rel += 1
        start = o['start']
        end = o['end']

        startLang = False
        endLang = False

        if 'language' in start:
            startLang = start['language'] == en
        if 'language' in end:
            endLang = end['language'] == en 
        if startLang and endLang:
            r += 1
            if len(tableDict) == 0:

                tableDict.update({"start": [start['label']],
                                "relation": [o['rel']['label']],
                                "end": [end['label']]})
            else:
                tableDict["start"].append(start['label'])
                tableDict["relation"].append(o['rel']['label'])
                tableDict["end"].append(end['label'])

for j in range(0, 80):
    ressources = requests.get('http://api.conceptnet.io/query?rel=/r/'+ random.choice(relations) +'&limit=100')
    obj = ressources.json()

    fr = 'fr'   
    en = 'en'
    rel = 0
    r = 0
    tableDict = {}

    for o in obj['edges']:
        rel += 1
        start = o['start']
        end = o['end']

        startLang = False
        endLang = False

        if 'language' in start:
            startLang = start['language'] == en 
        if 'language' in end:
            endLang = end['language'] == en 
        if startLang and endLang:
            r += 1
            if len(tableDict) == 0:

                tableDict.update({"start": [start['label']],
                                "relation": [o['rel']['label']],
                                "end": [end['label']]})
            else:
                tableDict["start"].append(start['label'])
                tableDict["relation"].append(o['rel']['label'])
                tableDict["end"].append(end['label'])

print(tableDict)