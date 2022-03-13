$(document).ready(function () {
    $.getJSON('scrap.json', function (data) {
        var count
        var timer
        restart()

        function restart() {
            // To uncomment when game1 is done
            // i=getRandomInt(100)
            i = 0
            answer = "True"
            count = 60

            var str = '<tr>' +
                '<td>Word</td>' +
                '</tr>';

            str += '<tr>' +
                '<td>' + data['start'][i] + '</td>' +
                '</tr>';


            $(".display-data-game2").html("");
            $(".display-data-game2").append(str);

            $("h3").html("Timer")
            $("#textSynonym-game2").hide()
            $("#btnEnter-game2").hide()
            $("#btnStart-game2").show()
            $(".display-data-game2").hide()

        }

        $("#btnStart-game2").click(function () {
            $("#textSynonym-game2").show()
            $("#btnEnter-game2").show()
            $("#btnStart-game2").hide()
            $(".display-data-game2").show()
            startTimer()

        });

        // To do
        $("#btnEnter-game2").click(function () {
            // $("#textSynonym")...
            // ... is right anwser? alert...
            stopTimer()
            restart()

        });

        function startTimer() {
            $("h3").html(count)
            timer = setInterval(() => {
                count--
                $("h3").html(count)
                if (count == 0) {
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
