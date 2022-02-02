const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button")
const timmeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button")

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input minimun with todays date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate countdown
function updateDOM() {
   countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    // hide input 
    inputContainer.hidden = true;

    // if countdown has ended, show compete
    if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false
    } else {
        // Show count down in progress

         // populate countdown 
    countdownElTitle.textContent = `${countdownTitle}`;
    timmeElements[0].textContent = `${days}`
    timmeElements[1].textContent = `${hours}`
    timmeElements[2].textContent = `${minutes}`
    timmeElements[3].textContent = `${seconds}`

    completeEl.hidden = true;
    countdownEl.hidden = false;
    }
    
   }, second);
}

// Take values from form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = { 
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    // check for valid date
    if (countdownDate === "") {
        alert("please select a proper date")
    } else {
        // get number virsion of date, updateCountdown
    countdownValue = new Date(countdownDate).getTime();
    updateDOM(); }
    
} 

// reset all values
function reset() {
    // Hide Countdown, show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    // stop countdown
    clearInterval(countdownActive);
    // Reset values 
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
}

// restore prev countdown
function restorepreviousCountdown() {
    // get countdown from local storage if available
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// on load, check local storage
restorepreviousCountdown();