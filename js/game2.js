$(document).ready(function () {
    var data = { start: [], relation: [], end: [] }
    var count
    var timer
    var url
    var extractedStart
    var extractedRel
    var points
    var str
    var possibleEnd
    var guessedWords
    var load

    restart()

    function restart() {
        i = 0
        answer = "True"
        count = 60
        extractedRel = ""
        extractedStart = ""
        points = 0


        str = '<tr>' +
            '<td>Word</td>' +
            '<td>Relation</td>' +
            '<td>Guess</td>' +
            '</tr>';

        $(".display-data-game2").html("");
        $(".display-data-game2").append(str);

        $("h3").html("Timer")
        $(".Instructions").html("Instruction")
        $("#textGuess-game2").hide()
        $("#btnEnter-game2").hide()
        $("#btnRestart-game2").hide()
        $("#btnStart-game2").show()
        $(".display-data-game2").hide()

    }

    $("#btnStart-game2").click(function () {
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

            console.log(data)

            load = true
            restart()
        }

        i = Math.floor(Math.random() * 100)
        extractedStart = data['start'][i]
        extractedRel = data['relation'][i]
        $(".Instructions").html(extractedStart + " " + extractedRel + "?")
        $("#textGuess-game2").show()
        $("#btnEnter-game2").show()
        $("#btnRestart-game2").show()
        $("#btnStart-game2").hide()
        $(".display-data-game2").show()
        startTimer()

    });

    $("#btnRestart-game2").click(function () {
        stopTimer()
        restart()
    })

    // To do
    $("#btnEnter-game2").click(function () {
        var guess = $("#textGuess-game2").val();
        possibleEnd = []
        guessedWords = []

        startUrl = extractedStart.replaceAll(" ", "_")
        startUrl = startUrl.toLowerCase()
        startUrl = startUrl.replaceAll("a_", "")
        startUrl = startUrl.replaceAll("an_", "")

        url = "http://localhost:3000/conceptnet/query?start=/c/en/" + startUrl + "&rel=/r/" + extractedRel + "&limit=1000"

        $.ajax({
            url: url,
            method: "GET",
            dataType: 'json'
        }).done(function (data2) {
            obj = data2['edges'];

            for (let j = 0; j < obj.length; j++) {
                possibleEnd.push(obj[j]['end']['label'])
            }
            if (possibleEnd.length == guessedWords.length) {
                alert("You guessed all the words! You scored " + points + "points!")
                stopTimer()
                restart()
            } else if (possibleEnd.includes(guess) && !guessedWords.includes(guess)) {
                points += 1;
                guessedWords.push(guess)
                str = '<tr style="background-color:#00FF00;">' +
                    '<td>' + extractedStart + '</td>' +
                    '<td>' + extractedRel + '</td>' +
                    '<td>' + guess + '</td>' +
                    '</tr>';
                $(".display-data-game2").append(str);
            } else {
                str = '<tr style="background-color:#FF0000">' +
                    '<td>' + extractedStart + '</td>' +
                    '<td>' + extractedRel + '</td>' +
                    '<td>' + guess + '</td>' +
                    '</tr>';
                $(".display-data-game2").append(str);
            }
        })
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
        alert("The game is over! You scored " + points + " points!")
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