// Simple LUKAIRO globe-style animation
// No imports, no engines, just raw canvas.

const canvas = document.getElementById("globe");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the viewport
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let t = 0; // time for animation

function draw() {
  if (!canvas.width || !canvas.height) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.18;

  // --- Globe outline ---
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 2;
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // --- Orbit ring ---
  const orbitRadius = radius * 1.6;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.arc(cx, cy, orbitRadius, 0, Math.PI * 2);
  ctx.stroke();

  // --- Orbiting platform dot ---
  const angle = t * 0.8;
  const dotX = cx + orbitRadius * Math.cos(angle);
  const dotY = cy + orbitRadius * Math.sin(angle);

  ctx.beginPath();
  ctx.fillStyle = "#00d0ff";
  ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
  ctx.fill();

  t += 0.01;
  requestAnimationFrame(draw);
}

draw();

console.log("MAIN.JS RUNNING");
