const canvas = document.getElementById("globe");
const ctx = canvas.getContext("2d");

const GLOBE_CONFIG = {
  maxDevicePixelRatio: 2, // cap DPR at 2 to balance performance with clarity on hi-DPI displays
  polarBiasProbability: 0.5, // 50/50 bias keeps more points near mid-latitudes
  latFalloff: 0.4, // reduces polar density so the arc field looks balanced
  globeScale: 0.38, // fraction of min(viewport) for projected globe radius
  latitudeLineRadius: 0.36, // fraction of min(viewport) for latitude guides
  longitudeSpeedMultiplier: 120, // point drift speed around the globe
  globeRotationSpeed: 0.2, // base globe rotation speed (deg/frame)
  pointCount: 180, // enough sparks for texture without overdraw
  baseSpeed: 0.0008, // base point drift speed
  speedVariation: 0.001, // random speed variance
  baseSize: 1.3, // base point size
  sizeVariation: 1.7, // random point size variance
  pointColor: "69,215,255",
  pointAlphaBase: 0.15,
  pointAlphaScale: 0.55,
  shadowColor: "rgba(69,215,255,0.35)"
};

const dpr = Math.min(window.devicePixelRatio || 1, GLOBE_CONFIG.maxDevicePixelRatio);
let width = 0;
let height = 0;
let rotationDeg = 0;

function biasedLatitude() {
  const latScale = Math.random() > GLOBE_CONFIG.polarBiasProbability ? 1 : GLOBE_CONFIG.latFalloff;
  return (Math.random() * 180 - 90) * latScale;
}

const points = Array.from({ length: GLOBE_CONFIG.pointCount }, () => ({
  lat: biasedLatitude(),
  lon: Math.random() * 360,
  speed: GLOBE_CONFIG.baseSpeed + Math.random() * GLOBE_CONFIG.speedVariation,
  size: GLOBE_CONFIG.baseSize + Math.random() * GLOBE_CONFIG.sizeVariation
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
  const scale = Math.min(width, height) * GLOBE_CONFIG.globeScale;
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
  const radius = Math.min(width, height) * GLOBE_CONFIG.latitudeLineRadius;
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
  ctx.save();
  ctx.shadowColor = GLOBE_CONFIG.shadowColor;
  const len = points.length;
  for (let i = 0; i < len; i++) {
    const p = points[i];
    p.lon += p.speed * GLOBE_CONFIG.longitudeSpeedMultiplier;
    const { x, y, depth } = project(p.lat, p.lon);
    const alpha = GLOBE_CONFIG.pointAlphaBase + depth * GLOBE_CONFIG.pointAlphaScale;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${GLOBE_CONFIG.pointColor},${alpha})`;
    ctx.shadowBlur = 6 * depth;
    ctx.arc(x, y, p.size * (0.6 + depth), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
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
  rotationDeg += GLOBE_CONFIG.globeRotationSpeed;
  requestAnimationFrame(tick);
}

resize();
window.addEventListener("resize", resize);
tick();
