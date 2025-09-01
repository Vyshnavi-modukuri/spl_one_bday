// ===== CONFIG =====
const REDIRECT_URL = "birthday.html";   // Surprise page
const COUNTDOWN_SECONDS = 10;           // Demo 10 seconds

// Elements
const hEl = document.getElementById("hours");
const mEl = document.getElementById("minutes");
const sEl = document.getElementById("seconds");

// Countdown logic
let endTime = Date.now() + COUNTDOWN_SECONDS * 1000;

function pad(n) { return String(n).padStart(2, "0"); }

function tick() {
    const remainingMs = endTime - Date.now();
    let totalSec = Math.max(0, Math.floor(remainingMs / 1000));

    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    hEl.textContent = pad(hrs);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);

    if (totalSec <= 0) {
        location.href = REDIRECT_URL;
        return;
    }

    requestAnimationFrame(tick);
}

tick();
