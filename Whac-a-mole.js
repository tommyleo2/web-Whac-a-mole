var onGame = false;
var isPresent = false;
var num = 60;
var moles = document.getElementsByClassName("radioButton");

window.onload = function() {
    var startButton = document.getElementById("startEnd");
    var endButton = document.getElementById("_startEnd");
    startButton.addEventListener("click", getChange);
    for (var i = 0; i < moles.length; i++) {
        moles[i].addEventListener("click", function() {
            var score = document.getElementById("scoreBox");
            score.descend = true;
            score.variable = 254;
            if (onGame) {
                if (this.thisOne) {
                    this.thisOne = false;
                    scoreBox.value++;
                    this.style.borderTop = "2px solid #A8A8A8";
                    this.style.borderBottom = "1px solid #A8A8A8";
                    this.style.borderLeft = "1px solid #A8A8A8";
                    this.style.borderRight = "1px solid #A8A8A8";
                    this.style.padding = "6px";
                    score.timer = setInterval(function() {
                        var rgb = "rgb(255, 255, 255)"
                        if (score.variable >= 255) {
                            clearInterval(score.timer);
                        }
                        if (score.variable <= 155) {
                            score.descend = false;
                        }
                        if (score.descend) {
                            score.variable -= 100/5;
                        } else {
                            score.variable += 130/20;
                        }
                        rgb = "rgb(" + Math.round(score.variable) + ",255," + Math.round(score.variable) + ")";
                        score.style.backgroundColor = rgb;
                    }, 10);
                    appear();
                } else {
                    scoreBox.value--;
                    score.timer = setInterval(function() {
                        var rgb = "rgb(255, 255, 255)"
                        if (score.variable >= 255) {
                            clearInterval(score.timer);
                        }
                        if (score.variable <= 155) {
                            score.descend = false;
                        }
                        if (score.descend) {
                            score.variable -= 100/5;
                        } else {
                            score.variable += 130/20;
                        }
                        rgb = "rgb(255," + Math.round(score.variable) + "," + Math.round(score.variable) + ")"
                        score.style.backgroundColor = rgb;
                    }, 10);
                }
            }
        });
    }
}

function getChange() {
    if (!onGame) {
        changeStatus();
        appear();
        timing();
    } else {
        document.getElementById("timeBox").value = 0.01;
        document.getElementById("timeBox").style.backgroundColor = "white";
    }
}

function changeStatus() {
    var startButton = document.getElementById("startEnd");
    var statusBox = document.getElementById("statusBox");
    document.getElementById("scoreBox").value = 0;
    statusBox.value = "Gaming";
    startButton.id = "_startEnd";
    startButton.innerHTML = "Stop Game";
    onGame = true;

}

function timing() {
    var time = document.getElementById("timeBox");
    time.value = 30;
    time.variable = 255;
    time.descend = true;
    time.timer = setInterval(function() {
        time.value = (time.value - 0.01).toFixed(2);
        fade(time);
        if (time.value <= 0) {
            clearInterval(time.timer);
            gameOver();
        }
    }, 10);
}

function appear() {
    do {
        num = Math.round(60 * Math.random());
    }  while (num == 60);
    moles[num].style.border = "4px solid #3F8FEC";
    moles[num].style.padding = "3px";
    moles[num].thisOne = true;
}

function gameOver() {
    onGame = false;
    var endButton = document.getElementById("_startEnd");
    var score = document.getElementById("scoreBox");
    var best = document.getElementById("_record");
    document.getElementById("timeBox").style.backgroundColor = "white";
    endButton.id = "startEnd";
    endButton.innerHTML = "Start Game";
    document.getElementById("statusBox").value = "Game Over";
    moles[num].style.borderTop = "2px solid #A8A8A8";
    moles[num].style.borderBottom = "1px solid #A8A8A8";
    moles[num].style.borderLeft = "1px solid #A8A8A8";
    moles[num].style.borderRight = "1px solid #A8A8A8";
    moles[num].style.padding = "6px";
    if (parseInt(best.textContent) < parseInt(score.value)) {
        best.textContent = score.value;
    }
}

function fade(time) {
    var rgb = "rgb(255,255,255)";
    if (time.value > 20) {
        if (time.descend) {
            time.variable -= 85/200;
            if (time.variable < 170) {
                time.descend = false;
            }
        } else {
            time.variable += 85/200;
            if (time.variable >= 255) {
                time.descend = true;
            }
        }
    }
    if (time.value > 10 && time.value <= 20) {
        if (time.descend) {
            time.variable -= 85/100;
            if (time.variable < 170) {
                time.descend = false;
            }
        } else {
            time.variable += 85/100;
            if (time.variable >= 255) {
                time.descend = true;
            }
        }
    }
    if (time.value > 5 && time.value <= 10) {
        if (time.descend) {
            time.variable -= 85/50;
            if (time.variable < 170) {
                time.descend = false;
            }
        } else {
            time.variable += 85/50;
            if (time.variable >= 255) {
                time.descend = true;
            }
        }
    }
    if (time.value > 0 && time.value <= 5) {
        if (time.descend) {
            time.variable -= 85/10;
            if (time.variable < 170) {
                time.descend = false;
            }
        } else {
            time.variable += 85/10;
            if (time.variable >= 255) {
                time.descend = true;
            }
        }
    }
    rgb = "rgb(255," + Math.round(time.variable) + "," + Math.round(time.variable) + ")";
    time.style.backgroundColor = rgb;
}

