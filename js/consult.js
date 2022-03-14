$(document).ready(function () {
    var str = '<tr>' +
        '<td>Start</td>' +
        '<td>Relation</td>' +
        '<td>End</td>' +
        '</tr>';

    $(".display-data-consult").append(str);

    $("#btnAjaxCall-consult").click(
        function () {
            var searchConcept = $("#searchConcept").val();
            var searchRelation = $("#searchRelation").val();
            str =""

            if (searchConcept == "") {
                url = "http://localhost:3000/conceptnet/query?rel=/r/" + searchRelation + "&limit=1000"
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
            }).done(function (data) {

                
                for (let i = 0; i < 2; i++) {
                    o = data['edges'][i]

                    str += '<tr>' +
                        '<td>' + o['start']['label'] + '</td>' +
                        '<td>' + o['rel']['label'] + '</td>' +
                        '<td>' + o['end']['label'] + '</td>' +
                        '</tr>';
                    $(".display-data-consult").append(str)
                }

                console.log(data)

            });

        });


});

// response = requests.get('http://api.conceptnet.io/query?start=/c/en/apple&rel=/r/ExternalURL&limit=1000')