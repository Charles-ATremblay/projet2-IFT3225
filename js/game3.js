$(document).ready(function() {
    $.getJSON('scrap.json', function(data) {
        var count
        var i
        var str
        var answer
        var startArray
        var hintsStartArray
        var hintsEndArray
        var endArray
        var timer
        var points
        var firstHint
        var lg = 'en'
        restart()

        function restart() {
            // To uncomment when game1 is done
            i = 0
            points = 8
            answer = "True"
            count = 0
            startArray = []
            endArray = []
            hintsEndArray = []
            hintsStartArray = []
            firstHint = ""
            str = '<tr>' +
                '<td>Hints</td>' +
                '</tr>';

            $("h3").html("Timer")
            $(".display-data-game3").html("");
            $(".display-data-game3").append(str);

            addHint()

            $(".WhoAmI").html("")
            $("#textGuess-game3").hide()
            $("#btnEnter-game3").hide()
            $("#btnStart-game3").show()
            $(".display-data-game3").hide()

        }

        $("#btnStart-game3").click(function() {
            i = Math.floor(Math.random() * 100)
            answer = data['start'][i]
            firstHint = "??? " + data['relation'][i] + " " + data['end'][i]
            answerUrl = answer.replaceAll(" ", "_")
            answerUrl = answerUrl.toLowerCase()
            answerUrl = answerUrl.replaceAll("a_", "")
            answerUrl = answerUrl.replaceAll("a_", "")

            str = '<tr>' +
                '<td>' + firstHint + '</td>' +
                '</tr>';

            $(".display-data-game3").append(str);

            startUrl = "http://localhost:3000/conceptnet/query?start=/c/en/" + answerUrl + "&limit=1000"
            endUrl = "http://localhost:3000/conceptnet/query?end=/c/en/" + answerUrl + "&limit=1000"

            $.ajax({
                url: startUrl,
                method: "Get",
                dataType: 'json'
            }).done(function(data2) {
                obj1 = data2['edges']

                for (let j = 0; j < obj1.length; j++) {
                    if (obj1[j]['end']['language'] == lg) {
                        startArray.push("??? " + obj1[j]['rel']['label'] + " " + obj1[j]['end']['label'])
                    }
                }

                for (let k = 0; k < 4; k++) {
                    hintsStartArray.push(startArray[Math.floor(Math.random() * startArray.length)])
                }
            })

            $.ajax({
                url: endUrl,
                method: "Get",
                dataType: 'json'
            }).done(function(data3) {
                obj2 = data3['edges']

                for (let j = 0; j < obj2.length; j++) {
                    if (obj2[j]['start']['language'] == lg) {
                        endArray.push(obj2[j]['start']['label'] + " " + obj2[j]['rel']['label'] + " ???")
                    }
                }

                for (let k = 0; k < 4; k++) {
                    hintsEndArray.push(endArray[Math.floor(Math.random() * endArray.length)])
                }
            })

            $("#textGuess-game3").show()
            $("#btnEnter-game3").show()
            $("#btnStart-game3").hide()
            $(".display-data-game3").show()
            startTimer()

        });

        // To do
        $("#btnEnter-game3").click(function() {
            var guess = $("#textGuess-game3").val()

            if (guess != "" && (guess == answerUrl || guess == answer)) {
                alert("You guessed correctly! You scored " + points + " points!")
                stopTimer()
                restart()
            } else if (guess != "" && (guess != answerUrl || guess != answer)) {
                $(".WhoAmI").html("Wrong guess, try again!")
            }
        });

        function addHint() {
            str = ""

            // Decides which side to cover
            if (Math.random() <= 0.5 && hintsStartArray.length != 0) {
                str = '<tr>' +
                    '<td>' + hintsStartArray[0] + '</td>' +
                    '</tr>';

                $(".display-data-game3").append(str);
                hintsStartArray = hintsStartArray.splice(1, hintsStartArray.length)

            } else if (Math.random() > 0.5 && hintsEndArray.length != 0) {
                str = '<tr>' +
                    '<td>' + hintsEndArray[0] + '</td>' +
                    '</tr>';

                $(".display-data-game3").append(str);
                hintsEndArray = hintsEndArray.splice(1, hintsEndArray.length)
            }
        }

        function startTimer() {

            $("h3").html(count)
            timer = setInterval(() => {
                count++

                $("h3").html(count)
                if (count % 20 == 0) {
                    addHint()
                    points -= 1
                }

                if (count == 120) {
                    $("h3").html(count)
                    clearInterval(timer)
                    timesUp()
                }
            }, 1000)
        }

        function timesUp() {
            alert("You did not answer in time. You lost :(")
            restart()
        }

        function stopTimer() {
            clearInterval(timer)
        }

        $("#ahome").click(function() {
            restart()
            stopTimer()
        });

        $("#aconsult").click(function() {
            restart()
            stopTimer()
        });

        $("#agame1").click(function() {
            restart()
            stopTimer()
        });

        $("#agame2").click(function() {
            restart()
            stopTimer()
        });

        $("#agame3").click(function() {
            restart()
            stopTimer()
        });

    });

});