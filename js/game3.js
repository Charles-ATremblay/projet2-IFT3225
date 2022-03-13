$(document).ready(function () {
    $.getJSON('scrap.json', function (data) {
        var count
        var str
        var answer
        var timer
        restart()

        function restart() {
            // To uncomment when game1 is done
            // i=getRandomInt(100)
            i = 0
            answer = "True"
            count = 0
            str = '<tr>' +
                '<td>Start</td>' +
                '<td>Relation</td>' +
                '<td>End</td>' +
                '</tr>';

            $("h3").html("Timer")
            $(".display-data-game3").html("");
            $(".display-data-game3").append(str);

            addHint()

            $("#textGuess-game3").hide()
            $("#btnEnter-game3").hide()
            $("#btnStart-game3").show()
            $(".display-data-game3").hide()

        }

        $("#btnStart-game3").click(function () {
            $("#textGuess-game3").show()
            $("#btnEnter-game3").show()
            $("#btnStart-game3").hide()
            $(".display-data-game3").show()
            startTimer()

        });

        // To do
        $("#btnEnter-game3").click(function () {
            // $("#textGues")...
            // ... is right anwser? alert...
            stopTimer()
            restart()

        });

        function addHint() {
            str = ""

            // Decides which side to cover
            if (Math.random() <= 0.5) {
                str += '<tr>' +
                    '<td>' + data['start'][i] + '</td>' +
                    '<td>' + data['relation'][i] + '</td>' +
                    '<td>' + "???" + '</td>' +
                    '</tr>';

                $(".display-data-game3").append(str);

            } else {
                str += '<tr>' +
                    '<td>' + "???" + '</td>' +
                    '<td>' + data['relation'][i] + '</td>' +
                    '<td>' + data['end'][i] + '</td>' +
                    '</tr>';

                $(".display-data-game3").append(str);

            }
        }

        function startTimer() {

            $("h3").html(count)
            timer = setInterval(() => {
                count++

                $("h3").html(count)
                if (count % 2 == 0) {
                    addHint()
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

        $("#ahome").click(function () {
            restart()
            stopTimer()
        });

        $("#aconsult").click(function () {
            restart()
            stopTimer()
        });

        $("#agame1").click(function () {
            restart()
            stopTimer()
        });

        $("#agame2").click(function () {
            restart()
            stopTimer()
        });

        $("#agame3").click(function () {
            restart()
            stopTimer()
        });

    });

});
