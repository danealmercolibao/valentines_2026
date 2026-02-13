const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const yesMessage = document.getElementById("yesMessage");
const hearts = document.getElementById("hearts");

const noPopup = document.getElementById("noPopup");
const noImage = document.getElementById("noImage");
const closePopup = document.getElementById("closePopup");
const noYesBtn = document.getElementById("noYesBtn");
const sadPopup = document.getElementById("sadPopup");
const sadImage = document.getElementById("sadImage");
const sadPopupText = document.getElementById("sadPopupText");
const sadYesBtn = document.getElementById("sadYesBtn");
const closeSadPopup = document.getElementById("closeSadPopup");

const noTexts = [
  "No 🙈",
  "Really no? 😢",
  "Think again 💭",
  "Last chance? 🥺",
  "Pleaseee? 💗"
];

let noCount = 0;
let yesScale = 1;
let yesGrowthStep = 0.18;
let sadPopupCount = 0;
const sadPopupMax = 3;
const sadPopupMessages = [
  "Pleaseee, be my Valentine? 😿💖",
  "cge na ba bb :< ",
  "Last nalng i YES NA! >:/"
];
const sadPopupImages = ["cat2.jpg", "cat3.jpg", "cat4.png"];

function spawnFloatHeart() {
  const el = document.createElement("span");
  el.className = "heart";
  el.textContent = Math.random() > 0.3 ? "💖" : "💕";
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 5 + Math.random() * 5 + "s";
  el.style.fontSize = 14 + Math.random() * 18 + "px";
  hearts.appendChild(el);
  setTimeout(() => el.remove(), 11000);
}

setInterval(spawnFloatHeart, 420);
for (let i = 0; i < 8; i++) {
  spawnFloatHeart();
}

function heartBurst(x, y) {
  const burst = document.createElement("div");
  burst.className = "burst";
  burst.style.left = x + "px";
  burst.style.top = y + "px";

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 2 ? "💖" : "✨";

    const angle = (Math.PI * 2 * i) / 18;
    const distance = 45 + Math.random() * 55;

    heart.style.setProperty("--x", Math.cos(angle) * distance + "px");
    heart.style.setProperty("--y", Math.sin(angle) * distance + "px");

    burst.appendChild(heart);
  }

  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 900);
}

yesBtn.addEventListener("click", (event) => {
  window.location.href = "letter.html";
});

noBtn.addEventListener("click", () => {
  noImage.src = "pics/cat1.jpg";
  noPopup.style.display = "flex";
  noPopup.setAttribute("aria-hidden", "false");

  noCount++;
  yesScale = Math.min(yesScale + yesGrowthStep, 3.2);
  yesGrowthStep = Math.min(yesGrowthStep + 0.08, 0.55);
  yesBtn.style.transform = `scale(${yesScale})`;

  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
});

function closeNoPopup() {
  noPopup.style.display = "none";
  noPopup.setAttribute("aria-hidden", "true");
}

function closeSadPopupNow() {
  sadPopup.style.display = "none";
  sadPopup.setAttribute("aria-hidden", "true");
}

function showSadPopup() {
  sadPopupCount += 1;
  sadImage.src =
    sadPopupImages[Math.min(sadPopupCount - 1, sadPopupImages.length - 1)];
  sadPopupText.textContent =
    sadPopupMessages[Math.min(sadPopupCount - 1, sadPopupMessages.length - 1)];
  sadPopup.style.display = "flex";
  sadPopup.setAttribute("aria-hidden", "false");
}

function startSadPopupSequence() {
  sadPopupCount = 0;
  showSadPopup();
}

function goToNextSadPopup() {
  closeSadPopupNow();
  if (sadPopupCount < sadPopupMax) {
    setTimeout(showSadPopup, 140);
  }
}

closePopup.addEventListener("click", () => {
  closeNoPopup();
});

noYesBtn.addEventListener("click", () => {
  closeNoPopup();
  startSadPopupSequence();
});

closeSadPopup.addEventListener("click", () => {
  goToNextSadPopup();
});

sadYesBtn.addEventListener("click", () => {
  closeSadPopupNow();
});

noPopup.addEventListener("click", (event) => {
  if (event.target === noPopup) {
    return;
  }
});

sadPopup.addEventListener("click", (event) => {
  if (event.target === sadPopup) {
    return;
  }
});

