$(document).ready(function() {
    var str = '<tr>' +
        '<td>Start</td>' +
        '<td>Relation</td>' +
        '<td>End</td>' +
        '</tr>';
    var urlnext
    var searchRelation
    var searchConcept
    var offset = 0
    var lg = "en"

    $(".display-data-consult").append(str);
    $("#prev").hide()
    $("#next").hide()

    $("#btnAjaxCall-consult").click(function() {
        searchConcept = $("#searchConcept").val();
        searchRelation = $("#searchRelation").val();

        searchConcept = searchConcept.replaceAll(" ", "_")
        searchConcept = searchConcept.toLowerCase()
        searchConcept = searchConcept.replaceAll("a_", "")
        searchConcept = searchConcept.replaceAll("an_", "")

        searchRelation = searchRelation.replaceAll(" ", "_")
        searchRelation = searchRelation.toLowerCase()
        searchRelation = searchRelation.replaceAll("a_", "")
        searchRelation = searchRelation.replaceAll("an_", "")

        $(".display-data-consult").html('<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>')
        $("h6").html("")
        offset = 0
        urlnext = ""
        $("#prev").hide()
        $("#next").hide()
        $("h5").text(offset + " for Concept: " + searchConcept + " and Relation: " + searchRelation)

        if (searchConcept == "") {
            url = "http://localhost:3000/conceptnet/query?start=/c/en&rel=/r/" + searchRelation + "&limit=1000"
        } else
        if (searchRelation == "") {
            url = "http://localhost:3000/conceptnet/query?start=/c/en/" + searchConcept + "&limit=1000"
        } else {
            url = "http://localhost:3000/conceptnet/query?start=/c/en/" + searchConcept + "&rel=/r/" + searchRelation + "&limit=1000"
        }

        $.ajax({
            url: url,
            method: "GET",
            dataType: 'json'
        }).done(function(data) {

            for (let i = 0; i < data['edges'].length; i++) {
                o = data['edges'][i]

                if (o['start']['language'] == lg && o['end']['language'] == lg) {
                    str = '<tr>' +
                        '<td>' + o['start']['label'] + '</td>' +
                        '<td>' + o['rel']['label'] + '</td>' +
                        '<td>' + o['end']['label'] + '</td>' +
                        '</tr>';
                    $(".display-data-consult").append(str)

                }

            }

            if (data.hasOwnProperty('view')) {
                if (data['view']['nextPage'] == undefined) {
                    $("h6").html("No more pages")
                    urlnext = ""
                    $("#next").hide()

                } else {
                    $("h6").html(data['view']['comment'])
                    urlnext = data['view']['nextPage']
                    $("#next").show()
                }

            }


        });

    });

    $("#prev").click(function() {
        $(".display-data-consult").html('<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>')
        $("h6").html("")
        offset -= 1000
        $("h5").text(offset + " for Concept: " + searchConcept + " and Relation: " + searchRelation)

        if (offset == 0) {
            $("#prev").hide()

        }

        if (searchConcept == "") {
            url = "http://localhost:3000/conceptnet/query?start=/c/en/&rel=/r/" + searchRelation + "&offset=" + offset + "&limit=1000"
        } else
        if (searchRelation == "") {
            url = "http://localhost:3000/conceptnet/query?start=/c/en/" + searchConcept + "&offset=" + offset + "&limit=1000"
        } else {
            url = "http://localhost:3000/conceptnet/query?start=/c/en/" + searchConcept + "&rel=/r/" + searchRelation + "&offset=" + offset + "&limit=1000"
        }

        $.ajax({
            url: url,
            method: "GET",
            dataType: 'json'
        }).done(function(data) {

            for (let i = 0; i < data['edges'].length; i++) {
                o = data['edges'][i]

                if (o['start']['language'] == lg && o['end']['language'] == lg) {
                    str = '<tr>' +
                        '<td>' + o['start']['label'] + '</td>' +
                        '<td>' + o['rel']['label'] + '</td>' +
                        '<td>' + o['end']['label'] + '</td>' +
                        '</tr>';
                    $(".display-data-consult").append(str)

                }

            }
            $("#prev").show()
            $("#next").show()

            if (data.hasOwnProperty('view')) {
                if (data['view']['nextPage'] == undefined) {
                    $("h6").html("No more pages")
                    urlnext = ""
                    $("#next").hide()

                } else {
                    $("h6").html(data['view']['comment'])
                    urlnext = data['view']['nextPage']
                }

            }

        });

    });

    $("#next").click(function() {
        $(".display-data-consult").html('<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>')
        $("h6").html("")
        $("h5").text(offset + 1000 + " for Concept: " + searchConcept + " and Relation: " + searchRelation)
        $("#prev").show()

        $.ajax({
            url: "http://localhost:3000/conceptnet" + urlnext,
            method: "GET",
            dataType: 'json'
        }).done(function(data) {

            for (let i = 0; i < data['edges'].length; i++) {
                o = data['edges'][i]

                if (o['start']['language'] == lg && o['end']['language'] == lg) {
                    str = '<tr>' +
                        '<td>' + o['start']['label'] + '</td>' +
                        '<td>' + o['rel']['label'] + '</td>' +
                        '<td>' + o['end']['label'] + '</td>' +
                        '</tr>';
                    $(".display-data-consult").append(str)

                }

            }
            $("#prev").show()
            $("#next").show()

            if (data.hasOwnProperty('view')) {
                if (data['view']['nextPage'] == undefined) {
                    $("h6").html("No more pages")
                    urlnext = ""
                    $("#next").hide()
                    offset += 1000

                } else {
                    $("h6").html(data['view']['comment'])
                    urlnext = data['view']['nextPage']
                    offset += 1000
                }

            }
        });

    });

});