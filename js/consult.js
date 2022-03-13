$(document).ready(function () {
    var str = '<tr>' +
        '<td>Start</td>' +
        '<td>Relation</td>' +
        '<td>End</td>' +
        '</tr>';

    $(".display-data-consult").append(str);

    $("#btnAjaxCall-consult").click(function () {
        $.ajax({
            searchConceptEN: 'http://localhost:3000/conceptnet/c/en/' + searchConcept,
            method: "GET",
            dataType: 'json'
        }).done(function (searchConceptEN) {

            $.ajax({
                searchConceptFR: 'http://localhost:3000/conceptnet/c/fr/' + searchConcept,
                method: "GET",
                dataType: 'json'
            }).done(function (searchConceptFR) {

                console.log(searchConceptFR)

            });

            console.log(searchConceptEN)

        });

    });


    $("#btnAjaxCall-consult").click(function () {
        $.ajax({
            searchRelation: 'http://api.conceptnet.io/query?rel=/r/' + searchRelation + '&limit=1000',
            method: "GET",
            dataType: 'json'

        }).done(function (searchConceptEN) {

            console.log(searchRelation)

        });


    });

});