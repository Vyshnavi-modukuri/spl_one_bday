// Elements
const candle = document.getElementById("candle-flame");
const blowBtn = document.getElementById("blow-candle-btn");
const giftSection = document.getElementById("gift-section");
const afterMessage = document.getElementById("after-candle-message");
const showGiftBtn = document.getElementById("show-gift-btn");
const audio = document.getElementById("birthday-audio");



// Blow Candle Button
blowBtn.addEventListener("click", () => {
    if(candle) candle.style.display = "none";       // Candle disappears
    if(blowBtn) blowBtn.style.display = "none";     // Button disappears

    startConfetti();                                // Start confetti

    // Show custom message and "Open Gift" button
    if(afterMessage) afterMessage.classList.remove("hidden");

     if(audio){
        audio.currentTime = 0; // start from beginning
        audio.play();
    }
});

// Show Gift Button
showGiftBtn.addEventListener("click", () => {
    if(giftSection) giftSection.classList.remove("hidden"); // Show gifts
    afterMessage.classList.add("hidden");                  // Hide message and button
});


// Confetti
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const confetti = [];
    for(let i=0;i<150;i++){
        confetti.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height - canvas.height,
            r: Math.random()*6 + 4,
            d: Math.random()*150 + 50,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.random()*10 -10
        });
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.moveTo(c.x + c.tilt + c.r/2, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.r);
            ctx.lineTo(c.x + c.tilt - c.r/2, c.y);
            ctx.closePath();
            ctx.fillStyle = c.color;
            ctx.fill();
        });
        update();
        requestAnimationFrame(draw);
    }

    function update() {
        confetti.forEach(c => {
            c.y += Math.cos(0.01 + c.d) + 2 + c.r/2;
            c.tilt += Math.sin(0.1);
            if(c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random()*canvas.width;
            }
        });
    }

    draw();
}


