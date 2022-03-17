$(document).ready(function () {
    var lg = "en"
    var url = "http://localhost:3000/conceptnet/query?start=/c/en&limit=1000"
    tableDict = []
    relArray = []
    conceptArray = []
    data = { start: [], rel: [], end: [] }

    $.ajax({
        url: url,
        method: "GET",
        dataType: 'json'
    }).done(function (dataAjax) {
        $("p").hide();
        obj = dataAjax['edges']

        for (let i = 0; i < obj.length; i++) {
            if (obj[i]['start']['language'] == lg && obj[i]['end']['language'] == lg) {
                tableDict.push({
                    "start": obj[i]['start']['label'],
                    "rel": obj[i]['rel']['label'],
                    "end": obj[i]['end']['label']
                })
            }
        }

        for (let j = 0; j < tableDict.length; j++) {
            if (!relArray.includes(tableDict[j].rel)) {
                relArray.push(tableDict[j].rel)

                if (!conceptArray.includes(tableDict[j].start) && !conceptArray.includes(tableDict[j].end)) {
                    conceptArray.push(tableDict[j].start)
                    conceptArray.push(tableDict[j].end)
                }

                data['start'].push(tableDict[j].start)
                data['rel'].push(tableDict[j].rel)
                data['end'].push(tableDict[j].end)

            }

            if (relArray.length == 20) {
                break
            }

        }

        for (let i = 120; i < 200; i++) {
            data['start'].push(tableDict[i].start)
            data['rel'].push(tableDict[i].rel)
            data['end'].push(tableDict[i].end)
        }

        var str = '<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>';

        for (var i = 0; i < data['start'].length; i++) {
            str += '<tr>' +
                '<td class="start">' + data['start'][i] + '</td>' +
                '<td class="rel">' + data['rel'][i] + '</td>' +
                '<td class="end">' + data['end'][i] + '</td>' +
                '</tr>';
        }

        $(".display-data-home").append(str);
    })

});