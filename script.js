// Elements
const timerSection = document.getElementById("timer-section");
const birthdaySection = document.getElementById("birthday-section");
const cakeSection = document.getElementById("cake-section");
const cakeContainer = document.getElementById("cake-container");
const giftSection = document.getElementById("gift-section");
const giftMessage = document.getElementById("gift-message");
const timerEl = document.getElementById("timer");

// Countdown
let timer = 10;

const countdown = setInterval(() => {
  timerEl.innerText = timer < 10 ? `00:0${timer}` : `00:${timer}`;
  timer--;

  if (timer < 0) {
    clearInterval(countdown);

    // Show birthday
    timerSection.classList.add("hidden");
    birthdaySection.classList.remove("hidden");

    startFireworks();

    // After 5 seconds, show cake
    setTimeout(() => {
      birthdaySection.classList.add("hidden");
      cakeSection.classList.remove("hidden");
    }, 5000);
  }
}, 1000);

// Fireworks
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: `hsl(${Math.random() * 360},100%,50%)`,
      radius: Math.random() * 3 + 2
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Cut Cake
document.getElementById("cut-cake-btn").addEventListener("click",()=>{
  cakeContainer.classList.remove("hidden");
});

// Blow Candle
document.getElementById("blow-candle-btn").addEventListener("click",()=>{
  document.getElementById("candle-flame").style.display="none";
  cakeSection.classList.add("hidden");
  giftSection.classList.remove("hidden");
});

// Gifts
function openGift(number){
  const messages = {
    1:"Happy Birthday! 🎉 Wishing you the best day ever!",
    2:"Inside joke: Remember our funny adventure? 😂 Love you!"
  };
  giftMessage.innerText = messages[number] || "Enjoy your gift! 🎁";
}
