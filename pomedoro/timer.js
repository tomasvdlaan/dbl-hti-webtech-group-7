function blockScreen() {}

function pomedoro() {
  timer(5, "timerDisplay", [
    {
      time: 2,
      callback: () => {
        document.querySelector("#timerDisplay").classList.add("warning");
      },
    },
    {
      time: 0,
      callback: () => {
        document.querySelector("#timerDisplay").classList.remove("warning");
        showTimeOut();
      },
    },
  ]);
}

function showTimeOut() {
  document.querySelector("#timeoutOverlay").classList.add("active");
  timer(5, "timeoutTimerDisplay", [
    {
      time: 0,
      callback: () => {
        document.querySelector("#timeoutOverlay").classList.remove("active");
        pomedoro();
      },
    },
  ]);
}

function timer(seconds, displayId, events) {
  let counter = seconds;
  displayTime(counter, displayId);
  var interval = setInterval(function () {
    counter -= 1;
    displayTime(counter, displayId);
    events.forEach((e) => {
      if (e.time == counter) e.callback();
    });
    if (counter <= 0) clearInterval(interval);
  }, 1000);
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
