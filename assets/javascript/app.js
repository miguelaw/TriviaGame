
$().ready(function(){
    
        var imagesForCorrectAnswer = ["win1.jpg","win2.jpg","win3.jpg","win4.jpg"];
        var imagesForIncorrectAnswer = ["error1.jpg","error2.jpg","error3.jpg","error4.jpg"];
    
        var questions = [
        {
            question: "What is the name of Linux’s Mascot?",
            "A": "Juri (A T-Rex)", "B": "Tux (A penguin)", "C": "Humphrey (A goose)", "D": "Gerald (A mouse)",
            answer: "B"
        },
        {
            question: "Which of these is commonly regarded as the first inexpensive and commercially available computer with GUI and Mouse?",
            "A": "Apple Lisa", "B": "Commodore 64", "C": "IBM PC 286Hz" , "D": "Google Chrome Book",
            answer: "A"
        },
        {
            question: "Which of these companies invented the floppy disk?",
            "A": "Microsoft in 1983", "B": "Apple in 1978", "C": "IBM in 1971" , "D": "CIA in 1955",
            answer: "C"
        },
        {
            question: "TCP Port number 80 is commonly reserved for?",
            "A": "FTP", "B": "Printer Internal Protocol", "C": "E-mail" , "D": "HTTP",
            answer: "D"
        },
        {
            question: "In which year was ASCII formed?",
            "A": 1973, "B": 1994, "C": 1963, "D": 1968,
            answer: "C"
        },
        {
            question: "Which of these companies manufactured the first CDs?",
            "A": "IBM", "B": "Sony", "C": "Phillips" , "D": "Apple",
            answer: "C"
        },
        {
            question: "In what year did the ARPANET (Advanced Research Projects Agency Network) became operational?",
            "A": 1969, "B": 1979, "C": 2000, "D": 1985,
            answer: "A"
        },
        {
            question: "1 KB is equal to...?",
            "A": "100 Bytes", "B": "1000 Bytes", "C": "10000 Bytes" , "D": "1024 Bytes",
            answer: "D"
        },
        {
            question: "In what year was DOS created?",
            "A": 1981, "B": 1995, "C": 1973, "D": 1999,
            answer: "A"
        },
        {
            question: "What does HTML stand for?",
            "A": "Hyperlink Markup Language", "B": "Hypertext Markup Language", "C": "Hypermess Markup Laser" , "D": "All of the above (?)",
            answer: "B"
        },

        ];
    
        var questionsSelected = [];
        
            var maxSecondsToWait = 10;
            var questionTimer = null;
            var questionNumber = 0;
            var correct = false;
            var correctCount = 0;
            var $choice = null;
            var currentQuestionNum = null;
        
        //Randomizes selection of question numbers, using do and while loops to run constantly.
        function prepareQuestions()  
        {
            var count = 0;
            do{
                var random = Math.floor(Math.random() * questions.length);
                if(questionsSelected.indexOf(random) < 0)
                {
                    count++;
                    questionsSelected.push(random);
                }
            }while (count < questions.length);
        
        }
        
        function displayQuestion()
        {	
            $("#choices li").hover(function(){
                $(this).css("background-color", "red");
            }, function(){
                $(this).css("background-color", "black");		
            });
        
            $("#answerArea").css("display", "none");
            $("#questionBlock").css("display", "block");
            $("#questionNumber").html(++questionNumber);
            currentQuestionNum = questionsSelected.shift();

            //Gets question
            var question = questions[currentQuestionNum];

            //Puts question into position on page
            $("p#question").html(question.question);
            $("div#choiceBlock ul#choices li#A").html(question.A);
            $("div#choiceBlock ul#choices li#B").html(question.B);
            $("div#choiceBlock ul#choices li#C").html(question.C);
            $("div#choiceBlock ul#choices li#D").html(question.D);
        
            $("#clock").css("display", "block");
            var secondsToWait = maxSecondsToWait;
            $("#timeLeft").html(secondsToWait);
            questionTimer = setInterval(function(){
                secondsToWait--;
                if(secondsToWait == 0)
                {
                    clearInterval(questionTimer);
                    var correctAnswer = questions[currentQuestionNum].answer;
                    displayAnswer("Time's Up!<br>The answer is: " + questions[currentQuestionNum][correctAnswer], false);
                    $("#answerArea").css("background-color", "red");
                    $("#answerArea").css("color", "black");
                    $("#answerArea").css("font-weight", "700");
                    document.getElementById('MusicError').play();

                    var timer = setTimeout(function(){
                        $("#answerArea").css("display", "none");
                        $("#answerArea #answer").html("");					
                        if(questionsSelected.length != 0)
                        {
                            displayQuestion();
                        }
                        else
                        {
                            summarize();
                        }
                    }, 4000);
                }
                $("#timeLeft").html(secondsToWait);
            }, 1000);
        }
        
        function displayAnswer(msg, isCorrect){
            $("#questionBlock").css("display", "none");
            $("#answerArea").css("display", "block");
            $("#answer").html(msg);
            var random = Math.floor(Math.random() * imagesForCorrectAnswer.length);
            var img;
            if(isCorrect)
            {
                img = imagesForCorrectAnswer[random];
            }
            else
            {
                img = imagesForIncorrectAnswer[random];		
            }
            $("#answerImage").html("<img src = 'assets/images/" + img + "'>");
            drawStars();
        }
        
        function drawStars()
        {
            var average = Math.round(correctCount/questions.length*100, 2);
            var numStars = 0;
            if (average >= 90)
                numStars = 4;
            else if(average >= 70)
                numStars = 3;
            else if(average >= 50)
                numStars = 2;
            else if(average >= 10)
                numStars = 1;
        
            var stars = "";
            for(var i = 0; i < numStars; i++)
                stars += '<span class="glyphicon glyphicon-ok"></span>';
            if (numStars == 0)
                stars = `<span class="glyphicon glyphicon-thumbs-down"></span>`;
                
            $("#bff").html(stars);
        }
        
        function gradeQuestion()
        {
            clearInterval(questionTimer);
        
            var answer = $(this).attr("id");
            var correctAnswer = questions[currentQuestionNum].answer;
            console.log(answer + " " + correctAnswer);
            if(answer == correctAnswer)
            {
                correctCount++;
                displayAnswer("Great Job!", true);
                $("#answerArea").css("background-color", "#66FF00");
                $("#answerArea").css("color", "white");
                $("#answerArea").css("font-weight", "700");
                document.getElementById('Success').play();
            }
            else 
            {
                displayAnswer("Critical Error!<br>The correct answer is: " + questions[currentQuestionNum][correctAnswer], false);
                $("#answerArea").css("background-color", "red");
                $("#answerArea").css("color", "black");
                $("#answerArea").css("font-weight", "700");
                document.getElementById('MusicError').play();

            }
            var timer = setTimeout(function(){
                $("#answerArea").css("display", "none");
                $("#answerArea #answer").html("");	
                if(questionsSelected.length != 0)
                {
                    displayQuestion();
                }
                else
                {
                    summarize();
                }
            }, 4000);
        }
        
        function summarize()
        {
            $("#answerArea").css("display", "none");
            $("#questionBlock").css("display", "none");
            $("#summaryArea").css("display", "block");
            $("#numQuestions").html(questions.length);
            $("#numCorrect").html(correctCount);
            $("#numWrong").html(questions.length - correctCount);
        }
        
        function startQuiz()
        {
            $("#startBtn").css("display", "none");
            $("#splashScreen").css("display", "none");
            prepareQuestions();
            displayQuestion();
        }
        
        function setUpHandlers(){
            $("#startBtn").on("click", startQuiz);
            $("#choices li").on("click", gradeQuestion);
            $("#restartBtn").on("click", restart);
        
        }
        
        function restart()
        {
            reset();
            prepareQuestions();
            displayQuestion();
        }
        
        function reset(){
            $("#answerArea").css("display", "none");
            $("#answerArea #answer").html("");	
            $("#questionBlock").css("display", "none");
            $("#summaryArea").css("display", "none");
            questionNumber = 0;
            correct = false;
            currentQuestionNum = null;
            correctCount = 0;
        }
        
        
        /*Where everything starts*/
        reset();
        setUpHandlers();
        $("#numberOfQuestions").html(questions.length);
        
        });