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

});