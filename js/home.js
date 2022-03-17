$(document).ready(function () {
    var str = '<tr>' +
    '<td>Start</td>' +
    '<td>Relation</td>' +
    '<td>End</td>' +
    '</tr>';
    var lg = "en"
    var url = "http://localhost:3000/conceptnet/query?start=/c/en&limit=1000"
    tableDict = []

    $.ajax({
        url:url,
        method: "GET",
        dataType: 'json'
    }).done(function(data){
        
        obj = data['edges']

        for(let i = 0; i<obj.length; i++){
            if (obj[i]['start']['language'] == lg && obj[i]['end']['language'] == lg) {
                tableDict.push({
                    "start": [obj[i]['start']['label']],
                    "rel": [obj[i]['rel']['label']],
                    "end": [obj[i]['end']['label']]
                })
            }
        }
        console.log(tableDict)

        for(let j=0; j<tableDict.length; j++){
            
        }
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