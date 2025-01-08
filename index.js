var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var started = false;

var level = 0; 

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout( function() {$("#"+ currentColor).removeClass("pressed")}, 100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNo = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNo];
    gamePattern.push(randomChosenColor);
    
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("right");
    
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
 }
 else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout( function() {$("body").removeClass("game-over")}, 200);
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("h1").text("Wrong Option, Press Any Key to Try Again!");
   startOver();
 }
}

function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    level = 0;
    started = false;
}
