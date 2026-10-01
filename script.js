const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".dot")];
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let current = 1;

function showPage(n, updateHash = true) {
  n = Math.max(1, Math.min(4, Number(n)));
  current = n;
  pages.forEach(p => p.classList.toggle("active", Number(p.dataset.page) === n));
  dots.forEach(d => d.classList.toggle("active", Number(d.dataset.go) === n));

  const active = pages[n - 1];
  if (active) active.scrollTop = 0;

  if (updateHash) history.replaceState(null, "", `#page${n}`);

  if (n === 2) startPetals();
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const next = Number(btn.dataset.next);
    showPage(next);
    if (music.paused) {
      try {
        await music.play();
        musicToggle.textContent = "Ⅱ";
      } catch(e) {}
    }
  });
});

dots.forEach(dot => dot.addEventListener("click", () => showPage(dot.dataset.go)));

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicToggle.textContent = "Ⅱ"; }
    catch(e) {}
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

document.getElementById("replay").addEventListener("click", async () => {
  music.currentTime = 0;
  showPage(1);
  try { await music.play(); musicToggle.textContent = "Ⅱ"; } catch(e) {}
});

window.addEventListener("hashchange", () => {
  const match = location.hash.match(/page([1-4])/);
  if (match) showPage(Number(match[1]), false);
});

function startPetals() {
  if (document.querySelectorAll(".petal").length > 8) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("i");
    p.className = "petal";
    p.style.left = `${Math.random() * 100}vw`;
    p.style.setProperty("--drift", `${(Math.random() - .5) * 180}px`);
    p.style.animationDuration = `${7 + Math.random() * 8}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 16000);
  }
}

const initial = location.hash.match(/page([1-4])/);
showPage(initial ? Number(initial[1]) : 1, false);
