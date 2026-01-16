const canvas = document.getElementById("globe");
const ctx = canvas.getContext("2d");

const dpr = Math.min(window.devicePixelRatio || 1, 2);
let width = 0;
let height = 0;
let rotationDeg = 0;

const points = Array.from({ length: 180 }, () => ({
  lat: (Math.random() * 180 - 90) * (Math.random() > 0.5 ? 1 : 0.4),
  lon: Math.random() * 360,
  speed: 0.0008 + Math.random() * 0.001,
  size: 1.3 + Math.random() * 1.7
}));

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function project(lat, lon) {
  const radLat = (lat * Math.PI) / 180;
  const radLon = ((lon + rotationDeg) * Math.PI) / 180;
  const x = Math.cos(radLat) * Math.cos(radLon);
  const y = Math.sin(radLat);
  const z = Math.cos(radLat) * Math.sin(radLon);
  const scale = Math.min(width, height) * 0.38;
  return {
    x: x * scale + width / 2,
    y: y * scale + height / 2,
    depth: (z + 1) / 2
  };
}

function drawLatitudeLines() {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  const radius = Math.min(width, height) * 0.36;
  const rotationRad = (rotationDeg * Math.PI) / 180;

  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.ellipse(
      width / 2,
      height / 2,
      radius,
      radius * Math.cos(rotationRad + i * 0.45),
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawPoints() {
  points.forEach((p) => {
    p.lon += p.speed * 120;
    const { x, y, depth } = project(p.lat, p.lon);
    ctx.beginPath();
    ctx.fillStyle = `rgba(69,215,255,${0.15 + depth * 0.55})`;
    ctx.shadowColor = "rgba(69,215,255,0.35)";
    ctx.shadowBlur = 6 * depth;
    ctx.arc(x, y, p.size * (0.6 + depth), 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGlow() {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.12,
    width / 2,
    height / 2,
    Math.min(width, height) * 0.46
  );
  gradient.addColorStop(0, "rgba(69,215,255,0.22)");
  gradient.addColorStop(0.4, "rgba(118,245,208,0.16)");
  gradient.addColorStop(1, "rgba(3,12,24,0.8)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function tick() {
  ctx.clearRect(0, 0, width, height);
  drawGlow();
  drawLatitudeLines();
  drawPoints();
  rotationDeg += 0.2;
  requestAnimationFrame(tick);
}

resize();
window.addEventListener("resize", resize);
tick();
