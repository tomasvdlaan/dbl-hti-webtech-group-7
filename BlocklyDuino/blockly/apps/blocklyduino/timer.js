const messages = [
  "It's important to take a break, keep up your good work!",
  "Go grab a drink and a snack to keep your focus next round",
  "I see you're doing a good job, you go!",
];

// Pomodoro selector
let workTimeSelector = 25 * 60;
let workTimeStep = 60;
let breakTimeSelector = 5 * 60;
let breakTimeStep = 30;

function incrementWorkTime(increment) {
  workTimeSelector += workTimeStep * increment;
  displayTime(workTimeSelector, "workTimeDisplay");
}

function incrementBreakTime(increment) {
  breakTimeSelector += breakTimeStep * increment;
  displayTime(breakTimeSelector, "breakTimeDisplay");
}

function startWorkTimer() {
  timer(workTimeSelector / 60, "timerDisplay", [
    {
      time: workTimeSelector / 60 / 5,
      callback: () => {
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-success");
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-danger");
        document
          .getElementById("timerDisplay")
          .classList.add("btn-outline-warning");
        showTimeOut();
      },
    },
    {
      time: workTimeSelector / 60 / 10,
      callback: () => {
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-warning");
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-success");
        document
          .getElementById("timerDisplay")
          .classList.add("btn-outline-danger");
        showTimeOut();
      },
    },
    {
      time: 0,
      callback: () => {
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-warning");
        document
          .getElementById("timerDisplay")
          .classList.remove("btn-outline-danger");
        document
          .getElementById("timerDisplay")
          .classList.add("btn-outline-success");
        startBreakTimer();
      },
    },
  ]);
}

// Break overlay
function startBreakTimer() {
  document.getElementById("timeoutOverlay").classList.add("active");
  document.getElementById("endBreakButton").classList.add("disabled");
  document.getElementById("endBreakButton").disabled = true;
  document.getElementById("closeBreakButton").disabled = true;
  document.getElementById("breakMessage").innerHTML =
    messages[Math.floor(Math.random() * messages.length)];
  timer(breakTimeSelector / 60, "timeoutTimerDisplay", [
    {
      time: 0,
      callback: () => {
        document.getElementById("endBreakButton").classList.remove("disabled");
        document.getElementById("endBreakButton").disabled = false;
        document.getElementById("closeBreakButton").disabled = false;
      },
    },
  ]);
}

// Timer stuff
function pauseTimer() {
  if (!pomodoroId) startWorkTimer();
  else paused = !paused;
}

let pomodoroId;
let paused = false;

function endBrake() {
  document.getElementById("timeoutOverlay").classList.remove("active");
}

function timer(seconds, displayId, events) {
  let counter = seconds;
  displayTime(counter, displayId);
  let interval = (pomodoroId = setInterval(function () {
    if (!paused) {
      counter -= 1;
      displayTime(counter, displayId);
      events.forEach((e) => {
        if (e.time == counter) e.callback();
      });
      if (counter <= 0) {
        clearInterval(interval);
        pomodoroId = null;
      }
    }
  }, 1000));
}

function displayTime(time, displayId) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let str = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
  document.querySelector(`#${displayId}`).innerHTML = str;
}
