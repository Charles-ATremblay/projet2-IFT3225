$(document).ready(function () {
    $.getJSON('scrap.json', function (data) {
        var str = '<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>';

        for (var i = 0; i < data['start'].length; i++) {
            str += '<tr>' +
                '<td>' + data['start'][i] + '</td>' +
                '<td>' + data['relation'][i] + '</td>' +
                '<td>' + data['end'][i] + '</td>' +
                '</tr>';
        }

        $(".display-data-home").append(str);

    });

    // tableDict = {}
    // relations = ["RelatedTo", "FormOf", "IsA", "PartOf", "HasA", "UsedFor", "CapableOf", "AtLocation",
    //     "Causes", "HasSubevent", "HasFirstSubevent", "HasLastSubevent", "HasPrerequisite", "HasProperty",
    //     "MotivatedByGoal", "ObstructedBy", "Desires", "CreatedBy", "Synonym", "Antonym", "DistinctFrom",
    //     "DerivedFrom", "SymbolOf", "DefinedAs", "MannerOf", "LocatedNear", "HasContext", "SimilarTo",
    //     "EtymologicallyRelatedTo", "EtymologicallyDerivedFrom", "CausesDesire", "MadeOf",
    //     "ReceivesAction", "ExternalURL"]
    // lg = 'en'

    // for (let i = 0; i < 21; i++) {


    //     $.ajax({
    //         url: "http://localhost:3000/conceptnet/query?rel=/r/" + relations[i] + "&limit=1000",
    //         method: "GET",
    //         dataType: 'json'
    //     }).done(function (data) {


    //         console.log("Getting relation " + relations[i] + " (" + i + ")")
    //         start = o['start']
    //         end = o['end']


    //         for (let i = 0; i < data['edges'].length; i++) {
    //             o = data['edges'][i]
    //             console.log(data['edges'].length)

    //             if (o['start']['language'] == lg && o['end']['language'] == lg) {
    //                 console.log("Relation found for " + relations[i] + " with " + start['label'])
    //                 tableDict.update({
    //                     "start": [start['label']],
    //                     "relation": [o['rel']['label']],
    //                     "end": [end['label']]
    //                 })

    //                 break

    //             } else {
    //                 console.log("Relation found for " + relations[i] + " with " + start['label'])
    //                 tableDict["start"].append(start['label'])
    //                 tableDict["relation"].append(o['rel']['label'])
    //                 tableDict["end"].append(end['label'])
    //                 break
    //             }



    //         }

    //         console.log(data)

    //     });


    // }


});