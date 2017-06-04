var combo = [];
var count = 0;
var sound = {};
var canPress = 0;
var on = 0;
var strict = 0;

$(document).ready(function () {
  sound[1] = document.getElementById("sound1");
  sound[2] = document.getElementById("sound2");
  sound[3] = document.getElementById("sound3");
  sound[4] = document.getElementById("sound4");
  sound[5] = document.getElementById("error");
});

function switchOn () {
  if (on === 0) {
    on = 1;
    $("#off").css("background-color", "#000");
    $("#on").css("background-color", "#87E5FF");
  }
  else {
    on = 0;
    $("#on").css("background-color", "#000");
    $("#off").css("background-color", "#87E5FF");
    $("#count").html("--");
    $("#strictIND").css("background-color", "#000");

  }
}

function strictMode (){
  if (strict === 0 && on == 1) {
    strict = 1;
    $("#strictIND").css("background-color", "#C7F464");
  }
  else {
    strict = 0;
    $("#strictIND").css("background-color", "#000");
  }
}

function startGame () {
  if (on == 1) {
    count = 0;
    combo = [];
    $("#winner").css("visibility", "hidden");
    setTimeout(function () {goSimon();}, 1000);
  }
}



function goSimon () {
  addCombo();
  playCombo();
}

function addCombo () {
  combo.push(Math.floor(Math.random() * 4 + 1));
}

function playCombo () {
  canPress = 0;
  $("#count").html(combo.length)
  for (var i = 0; i < combo.length; i++) {
    playBTN(i);
  }
  function playBTN (i) {
    setTimeout(function () {
      buttonPress(combo[i]);
      if (i == combo.length - 1) {
        canPress = 1;
      }
    }, i * 800);
  }
}

function pressButton (btn) {
  if (canPress==1) {
    buttonPress(btn);
    checkCorrect(btn);
  }
}

function youWin() {
  canPress = 0;
  $("#winner").css("visibility", "visible");
}

function checkCorrect (btn) {
  if (count == 19) {
    youWin();
  }
  else if (btn == combo[count]) {
    count++;
    if (count == combo.length) {
      count = 0;
      setTimeout(goSimon, 1200);
    }
  }
  else {
    if (strict === 0) {
      sound[5].play();
      setTimeout(playCombo, 1000);
      count = 0;
    }
    else {
      sound[5].play();
      startGame();
      $("#count").html("--");
    }
  }
}

function buttonPress (btn) {
  changeColor();
  setTimeout(returnColor,200);

  function changeColor () {
  switch (btn) {
    case 1:
      $("#btn1").css("background-color", "#FFEA92");
      sound[1].play();
      break;
    case 2:
      $("#btn2").css("background-color", "#FF8E76");
      sound[2].play();
      break;
    case 3:
      $("#btn3").css("background-color", "#86AAAD");
      sound[3].play();
      break;
    case 4:
      $("#btn4").css("background-color", "#A17184");
      sound[4].play();
      break;
  }
}


  function returnColor () {
    $("#btn1").css("background-color", "#ECD078");
    $("#btn2").css("background-color", "#D95B43");
    $("#btn3").css("background-color", "#53777A");
    $("#btn4").css("background-color", "#542437");
  }
}
