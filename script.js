const startBtnElem = document.getElementById("startBtn");
const gearBtnElem = document.getElementById("gearBtn");
const minutesInputElem = document.getElementById("minutesInputElem");
const secondsInputElem = document.getElementById("secondsInputElem");
const ringElem = document.querySelector(".ring");
const minuteInMs = 60000;
const secondInMs = 1000;
let totalTimer;


startBtnElem.addEventListener("click", () => {
  originalTimeEntered = {
    "minutes": minutesInputElem.value,
    "seconds": secondsInputElem.value
  };

  toggleStartStop();
  if(startBtnElem.attributes['isActive'].value === 'true') {
    ringElem.classList.remove("ending");
    totalTimer =
      Number((minutesInputElem.value * minuteInMs +
        secondsInputElem.value * secondInMs) /
        secondInMs);
      
    recursiveCountdown(uiCountdown, totalTimer, originalTimeEntered);
  } else {
    ringElem.classList.add("ending");
    clearTimeout('recursiveCountdown');
    minutesInputElem.value = originalTimeEntered.minutes;
    secondsInputElem.value = originalTimeEntered.seconds;
  }
});

//timer functionality
function uiCountdown() {
  if (minutesInputElem.value == '0' && secondsInputElem.value == '00') return
  if (secondsInputElem.value == "00" || secondsInputElem.value == "0") {
    secondsInputElem.value = "59"
    minutesInputElem.value = minutesInputElem.value - 1;
  } else {
    secondsInputElem.value = secondsInputElem.value - 1
  }
}

function recursiveCountdown(fn, count, originalTime) {
  var secondsPassed = 0;
  function innerWorker() {
    if(startBtnElem.attributes['isActive'].value === 'false') return
    fn();
    secondsInputElem.value = secondsInputElem.value.length === 1 ? '0' + secondsInputElem.value : secondsInputElem.value;
    secondsPassed += 1;
    setTimeout(function () {
      if (secondsPassed < count) {
        innerWorker();
        
      } else {
        toggleStartStop();
        ringElem.classList.add("ending");
        minutesInputElem.value = originalTime.minutes == '' ? '0' : originalTime.minutes;
        secondsInputElem.value = originalTime.seconds;
        window.style.backgroundColor = 'red';
      }
    }, 1000);
  }
  innerWorker();
}

function toggleStartStop() {
  console.log("toggleStartStop", startBtnElem.attributes['isActive'].value)
  startBtnElem.innerText = startBtnElem.innerText === "START" ? "STOP" : "START";
  startBtnElem.attributes['isActive'].value === 'false' ? startBtnElem.attributes['isActive'].value = 'true' : startBtnElem.attributes['isActive'].value = 'false';
  startBtnElem.attributes['isActive'].value === 'false' ? startBtnElem.style.color = 'green' : startBtnElem.style.color = 'red';
  startBtnElem.attributes['isActive'].value === 'false' ? ringElem.classList.remove('ending') : ringElem.classList.add('ending');
}

function secondsValidator() {
  //use regex to remove non-numeric characters
  let toValidate;

  if(secondsInputElem.value.length !== 0) {
    toValidate = secondsInputElem.value.replace(/\D/g, "");
  }

  if (secondsInputElem.value > 59 || toValidate === '' && secondsInputElem.value.length !== 0) {
    secondsInputElem.value = 59;
  }

  if(secondsInputElem.value === '' || secondsInputElem.value.length > 2) {
    secondsInputElem.value = 00;
  }
}
// settings functionality
gearBtnElem.addEventListener("click", () => {
  if(document.querySelectorAll('[disabled]').length > 0) {
  minutesInputElem.removeAttribute("disabled");
  secondsInputElem.removeAttribute("disabled");
  } else {
  minutesInputElem.setAttribute("disabled", "true");
  secondsInputElem.setAttribute("disabled", "true");
  }
});