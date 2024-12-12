// (Moving)
const menuButtons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.section');

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.getAttribute('data-section');
    sections.forEach(section => {
      if (section.id === targetSection) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  });
});

// (Clock)
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);

// (Alarm)
let alarmTime = null;
let alarmTimeout = null;

document.getElementById("set-alarm").addEventListener("click", function () {
  const alarmInput = document.getElementById("alarm-time").value;
  if (!alarmInput) {
    alert("Please select a valid time for the alarm.");
    return;
  }

  alarmTime = alarmInput;
  document.getElementById("alarm-status").textContent = `Alarm set for ${alarmTime}.`;

  const now = new Date();
  const alarmDate = new Date(now.toDateString() + ' ' + alarmTime);
  const timeToAlarm = alarmDate - now;

  if (timeToAlarm >= 0) {
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(() => {
      alert("Alarm ringing!");
      document.getElementById("alarm-status").textContent = "No alarm set.";
    }, timeToAlarm);
  } else {
    alert("The selected time is in the past!");
  }
});

// (Stopwatch)
let stopwatchSeconds = 0;
let stopwatchInterval = null;

function formatStopwatchTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

document.getElementById("start-stopwatch").addEventListener("click", function () {
  const button = this;
  if (button.textContent === "Start") {
    button.textContent = "Pause";
    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      document.getElementById("stopwatch").textContent = formatStopwatchTime(stopwatchSeconds);
    }, 1000);
  } else {
    button.textContent = "Start";
    clearInterval(stopwatchInterval);
  }
});

document.getElementById("reset-stopwatch").addEventListener("click", function () {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  document.getElementById("stopwatch").textContent = "00:00:00";
  document.getElementById("start-stopwatch").textContent = "Start";
});

//(Timer)
let timerInterval = null;

document.getElementById("start-timer").addEventListener("click", function () {
  const hours = parseInt(document.getElementById("timer-hours").value) || 0;
  const minutes = parseInt(document.getElementById("timer-minutes").value) || 0;
  const seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
  
  let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time.");
    return;
  }

  clearInterval(timerInterval);
  
  document.getElementById("timer-display").textContent = formatTimerTime(totalSeconds);

  timerInterval = setInterval(function () {
    totalSeconds--;
    document.getElementById("timer-display").textContent = formatTimerTime(totalSeconds);
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
});

document.getElementById("stop-timer").addEventListener("click", function () {
  clearInterval(timerInterval);
  document.getElementById("timer-display").textContent = "00:00:00";
});

function formatTimerTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}
