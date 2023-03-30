//Variables - these are the query selectors which references the HTML
var startBtn = document.querySelector(".start-btn");
var countdown = document.querySelector("#countdown");
var question = document.querySelector(".question");
var choice1 = document.querySelector(".choice1");
var choice2 = document.querySelector(".choice2");
var choice3 = document.querySelector(".choice3");
var choice4 = document.querySelector(".choice4");
var theTest = document.querySelector(".the-test");
var finalResult = document.querySelector("#correct-incorrect");
var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");
var theScore = document.querySelector(".the-score");
var viewHighscores = document.querySelector("#highscore");
var theHighscore = document.querySelector(".highscores-section");

//Variaables - Set of questions to trigger
var q1 = "Which of the following keywords is used to define a variable in Javascript?"
var q2 = "How to stop an interval timer in Javascript?"
var q3 = "Which function is used to serialize an object into a JSON string in Javascript?"
var q4 = "What data type is 'bronco' in var cars = ['bronco', 'jeep', '4runner']?"
var q5 = "Which of the following methods can be used to display data in some form using Javascript?"
var theQuestions = [q1, q2, q3, q4, q5]

//Variable Objects - Multiple choice answers 
var testChoice1 = {
    optionA: "A--  Var",
    optionB: "B--  Let",
    optionC: "C--  Both A and B",
    optionD: "D--  None of the above"
}
var testChoice2 = {
    optionA: "A--  clearTimer",
    optionB: "B-- clearInterval",
    optionC: "C-- intervalOver",
    optionD: "D-- stopTimer"
}

var testChoice3 = {
    optionA: "A--  stringify()",
    optionB: "B--  parse()",
    optionC: "C--  convert()",
    optionD: "D--  None of the above"
}

var testChoice4 = {
    optionA: "A--  undefined",
    optionB: "B--  string",
    optionC: "C--  boolean",
    optionD: "D--  number"
}

var testChoice5 = {
    optionA: "A--  document.write()",
    optionB: "B--  consol.log()",
    optionC: "C--  window.alert()",
    optionD: "D--  All of the above"
}
//Variable arrays that contain the answers
var theAnswers = [testChoice1, testChoice2, testChoice3, testChoice4, testChoice5]

//These are all the correct answers to the questions
var right1 = testChoice1.optionC;
var right2 = testChoice2.optionB;
var right3 = testChoice3.optionA;
var right4 = testChoice4.optionB;
var right5 = testChoice5.optionD;
var rightAnswers = [right1, right2, right3, right4, right5]

//When start button is clicked the countdown begins 
    startBtn.addEventListener("click", startTimer)

//start questions
    startBtn.addEventListener("click", function(){
        document.querySelector(".javascript").style.display = "none";
        theTest.style.display = "block";
        })

//When selected answer button is clicked it will trigger the next question
    startBtn.addEventListener("click", nextQuestion)

    var correctIndex = 0;  

//function for the next question 
    function nextQuestion(){

 //Once they complete the test, user is now taken to the page to enter their initials
    if (correctIndex === theQuestions.length - 1) {
        setTimeout(function(){theTest.style.display = "none";
        initialsSection.style.display = "inline";
    }, 500);

//Stop the timer 
        setTimeout(function(){clearInterval(timerInterval)}, 500);

//go to the next question if not all have been answered
    } else {
        question.textContent = theQuestions[correctIndex];
        choice1.textContent = theAnswers[correctIndex].optionA;
        choice2.textContent = theAnswers[correctIndex].optionB;
        choice3.textContent = theAnswers[correctIndex].optionC;
        choice4.textContent = theAnswers[correctIndex].optionD;
    }
    }
    
//timer countdown function from 60 seconds
    var timeLeft = 60;
    var timerInterval;
    function startTimer(){
        timerInterval = setInterval(function() {
            timeLeft --;
            countdown.textContent =  "Time: " + timeLeft + " seconds";
        
//if time runs out, go to the initials page for user to enter their initials
            if (timeLeft === 0) {
              clearInterval(timerInterval);
              theTest.style.display = "none";
              initialsSection.style.display = "inline";
            }
          }, 1000);
        return timerInterval;
    }   

//verify when an answer button is clicked and answer was correct
theTest.addEventListener("click", verifyAnswer)

//verify correct answer function
function verifyAnswer(event){
    if(event.target.matches(".trigger")){
        var userChoice = event.target.textContent;

//refreshes the page to start the test again if the start again button is clicked
        finalResult.textContent = " ";
        finalResult.style.display = "block";
            if (userChoice === rightAnswers[correctIndex]){
                finalResult.textContent = "Correct!";
                setTimeout(function(){ finalResult.style.display = "none"}, 500);
            } else {
                finalResult.textContent = "Wrong!"
                setTimeout(function(){ finalResult.style.display = "none"}, 500);
                timeLeft -= 5;
                countdown.textContent =  "Time: " + timeLeft + " seconds";
            }
            correctIndex++;
    }
    return timeLeft;
};

//When user chooses their answer, go to the next question
theTest.addEventListener("click", function(event){
    if(event.target.matches(".trigger")){
        nextQuestion();
    }})

//submit button 
submitButton.addEventListener("click", function(event){
    event.preventDefault();

//record user info
    newUser();        

//document users initials and user score
        initialsSection.style.display = "none";
        document.querySelector(".the-score").style.display = "block";
        document.querySelector(".user-scores").style.display = "block";
})

//Function that records user info into thre local storage
function newUser() {
    var userInitial = document.querySelector("#initials").value;
    if (userInitial === "") {
        userInitial = "anonymous";
    } 
        localStorage.setItem(userInitial, timeLeft);
        document.querySelector(".user-scores").textContent = " ";
        var p = document.createElement("p");
        p.textContent = userInitial + ": " + timeLeft;
        document.querySelector(".user-scores").appendChild(p);    
    
}

//Begin the test again when start over button is clicked
document.querySelector(".start-over").addEventListener("click", function(){
    
//reset questions
    correctIndex = 0;
    
//reset countdown
    timeLeft = 60;
    countdown.textContent =  "Time: 60 seconds";
    
//go back to initial first page of test
    document.querySelector(".javascript").style.display = "block";
    
//hide current page
    theScore.style.display = "none";
})

//clear highscore when "Clear Highscores" button is pressed
document.querySelector(".clear-highscores").addEventListener("click", function(){
    localStorage.clear();

//reset score list content
    document.querySelector(".user-scores").textContent = " ";
    document.querySelector(".user-scores").style.display = "none";

});

//view highscores for previous records
viewHighscores.addEventListener("click", function(){

//stop timer if user goes to highscore page
    clearInterval(timerInterval);
   
//hide all pages except highscore page
    document.querySelector(".javascript").style.display = "none";
    theTest.style.display = "none";
    initialsSection.style.display = "none";
    theScore.style.display = "block";

// For loop the local store and push all input value to html and reset the past highscores.
    document.querySelector(".user-scores").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".user-scores").appendChild(p);}
    })