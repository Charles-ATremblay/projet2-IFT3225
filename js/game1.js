$(document).ready(function () {
    var data = { start: [], relation: [], end: [] }
    var count
    var timer
    var load
    restart()

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function restart() {
        stopTimer()
        i = getRandomInt(100)
        x = i
        answer = "True"
        count = 60

        // Decides if it will true or false
        if (Math.random() <= 0.5) {
            x = getRandomInt(99)
            answer = "False"
        }

        var str = '<tr>' +
            '<td>Start</td>' +
            '<td>Relation</td>' +
            '<td>End</td>' +
            '</tr>';

        str += '<tr>' +
            '<td>' + data['start'][i] + '</td>' +
            '<td>' + data['relation'][i] + '</td>' +
            '<td>' + data['end'][x] + '</td>' +
            '</tr>';


        $(".display-data-game1").html("");
        $(".display-data-game1").append(str);

        $("h3").html("Timer")
        $("#btnTrue-game1").hide()
        $("#btnFalse-game1").hide()
        $("#btnStart-game1").show()
        $(".display-data-game1").hide()

    }

    $("#btnStart-game1").click(function () {
        if (!load) {
            var startHTML = $('.start').map(function () {
                return $.trim($(this).text());
            }).get();

            var relHTML = $('.rel').map(function () {
                return $.trim($(this).text());
            }).get();

            var endHTML = $('.end').map(function () {
                return $.trim($(this).text());
            }).get();

            for (let i = 0; i < startHTML.length; i++) {
                data['start'].push(startHTML[i])
                data['relation'].push(relHTML[i])
                data['end'].push(endHTML[i])
            }

            load = true
            restart()
        }

        $("#btnTrue-game1").show()
        $("#btnFalse-game1").show()
        $("#btnStart-game1").hide()
        $(".display-data-game1").show()
        startTimer()


    });

    $("#btnTrue-game1").click(function () {
        if (answer == "True") {
            alert("You won :)")
        } else {
            alert("You lost :(")
        }
        stopTimer()
        restart()

    });

    $("#btnFalse-game1").click(function () {
        if (answer == "False") {
            alert("You won :)")
        } else {
            alert("You lost :(")
        }
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