$(document).ready(function () {
    var str = '<tr>' +
    '<td>Start</td>' +
    '<td>Relation</td>' +
    '<td>End</td>' +
    '</tr>';
    var lg = "en"
    var url = "http://localhost:3000/conceptnet/query?start=/c/en&limit=1000"
    tableDict = []
    relArray = []
    conceptArray = []

    $.ajax({
        url:url,
        method: "GET",
        dataType: 'json'
    }).done(function(data){
        
        obj = data['edges']

        for(let i = 0; i<obj.length; i++){
            if (obj[i]['start']['language'] == lg && obj[i]['end']['language'] == lg) {
                tableDict.push({
                    "start": obj[i]['start']['label'],
                    "rel": obj[i]['rel']['label'],
                    "end": obj[i]['end']['label']
                })
            }
        }
        console.log(tableDict)

        for(let j=0; j<tableDict.length; j++){
            if(!relArray.includes(tableDict[j].rel)){
                relArray.push(tableDict[j].rel)
            }

            if(!conceptArray.includes(tableDict[j].start) && !conceptArray.includes(tableDict[j].end)){
                conceptArray.push(tableDict[j].start)
                conceptArray.push(tableDict[j].end)
            }
        }

        // TODO: loop in the relations array and picks 20 at random
        // TODO: loop in the rest of dictionnary for different words
        for(let k=0; k < relArray.length; k++){

        }
        console.log(conceptArray)

    })

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

});