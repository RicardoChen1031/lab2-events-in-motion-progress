var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var rocket = document.getElementById("rocket");
var spaceStage = document.getElementById("spaceStage");
var countdownText = document.getElementById("countdownText");
var largeCountdown = document.getElementById("largeCountdown");
var progressBar = document.getElementById("progressBar");
var systemStatus = document.getElementById("systemStatus");
var flightStatus = document.getElementById("flightStatus");
var missionName = document.getElementById("missionName");
var destinationImage = document.getElementById("destinationImage");
var destinationButtons = document.querySelectorAll(".destination");
var windowSize = document.getElementById("windowSize");
var target = document.getElementById("target");
var coordinates = document.getElementById("coordinates");
var starsBack = document.getElementById("starsBack");
var starsFront = document.getElementById("starsFront");
var timer;
var missionRunning = false;

// Click event: choose a destination.
for (var i = 0; i < destinationButtons.length; i++) {
  destinationButtons[i].addEventListener("click", function () {
    if (missionRunning) {
      return;
    }

    for (var j = 0; j < destinationButtons.length; j++) {
      destinationButtons[j].classList.remove("selected");
    }

    this.classList.add("selected");
    missionName.textContent = this.getAttribute("data-name");
    destinationImage.src = this.getAttribute("data-image");
    activateCard("clickCard");
  });
}

// Click and time events: run a five-second countdown.
startButton.addEventListener("click", function () {
  if (missionRunning) {
    return;
  }

  missionRunning = true;
  startButton.disabled = true;
  systemStatus.textContent = "COUNTDOWN ACTIVE";
  flightStatus.textContent = "FLIGHT STATUS: COUNTDOWN";
  activateCard("clickCard");
  activateCard("timeCard");

  var count = 5;
  showCount(count);

  timer = setInterval(function () {
    count = count - 1;

    if (count > 0) {
      showCount(count);
    } else {
      clearInterval(timer);
      launchRocket();
    }
  }, 1000);
});

function showCount(number) {
  countdownText.textContent = number;
  largeCountdown.textContent = number;
  progressBar.style.width = (6 - number) * 20 + "%";
}

function launchRocket() {
  countdownText.textContent = "LAUNCHED";
  largeCountdown.textContent = "LIFTOFF";
  progressBar.style.width = "100%";
  systemStatus.textContent = "MISSION ACTIVE";
  flightStatus.textContent = "FLIGHT STATUS: ASCENDING";
  spaceStage.classList.add("launching");
}

// Mouse event: move the target and star layers.
spaceStage.addEventListener("mousemove", function (event) {
  var box = spaceStage.getBoundingClientRect();
  var x = event.clientX - box.left;
  var y = event.clientY - box.top;

  target.style.left = x + "px";
  target.style.top = y + "px";
  coordinates.textContent = "X " + Math.round(x) + " · Y " + Math.round(y);
  starsBack.style.transform = "translate(" + x / 45 + "px, " + y / 45 + "px)";
  starsFront.style.transform = "translate(" + x / 22 + "px, " + y / 22 + "px)";
  activateCard("mouseCard");
});

// Keyboard events: D changes display mode and R resets the mission.
document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "D") {
    document.body.classList.toggle("light-mode");
    activateCard("keyboardCard");
  }

  if (event.key === "r" || event.key === "R") {
    resetMission();
    activateCard("keyboardCard");
  }
});

resetButton.addEventListener("click", resetMission);

function resetMission() {
  clearInterval(timer);
  missionRunning = false;
  startButton.disabled = false;
  countdownText.textContent = "STANDBY";
  largeCountdown.textContent = "READY";
  progressBar.style.width = "0";
  systemStatus.textContent = "SYSTEM READY";
  flightStatus.textContent = "FLIGHT STATUS: READY";
  spaceStage.classList.remove("launching");
}

function activateCard(cardId) {
  document.getElementById(cardId).classList.add("active");
}

// Window event and BOM feature: report the browser width.
function updateWindowSize() {
  windowSize.textContent = window.innerWidth + " px";
}

window.addEventListener("resize", updateWindowSize);
updateWindowSize();
