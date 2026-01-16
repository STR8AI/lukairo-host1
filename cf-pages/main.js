const canvas = document.getElementById("globe");
const ctx = canvas.getContext("2d");

const GLOBE_CONFIG = {
  maxDevicePixelRatio: 2, // cap DPR at 2 to balance performance with clarity on hi-DPI displays
  polarBiasProbability: 0.5, // chance to keep points closer to equator vs poles
  latFalloff: 0.4, // scales down polar density for visual balance
  longitudeSpeedMultiplier: 120, // point drift speed around the globe
  globeRotationSpeed: 0.2, // base globe rotation speed (deg/frame)
  pointCount: 180, // number of spark points on the globe
  baseSpeed: 0.0008, // base point drift speed
  speedVariation: 0.001, // random speed variance
  baseSize: 1.3, // base point size
  sizeVariation: 1.7, // random point size variance
  pointColor: "69,215,255",
  pointAlphaBase: 0.15,
  pointAlphaScale: 0.55,
  shadowColor: "rgba(69,215,255,0.35)"
};

const {
  maxDevicePixelRatio: MAX_DEVICE_PIXEL_RATIO,
  polarBiasProbability: POLAR_BIAS_PROBABILITY,
  latFalloff: LAT_FALLOFF,
  longitudeSpeedMultiplier: LONGITUDE_SPEED_MULTIPLIER,
  globeRotationSpeed: GLOBE_ROTATION_SPEED,
  pointCount: POINT_COUNT,
  baseSpeed: BASE_SPEED,
  speedVariation: SPEED_VARIATION,
  baseSize: BASE_SIZE,
  sizeVariation: SIZE_VARIATION,
  pointColor: POINT_COLOR,
  pointAlphaBase: POINT_ALPHA_BASE,
  pointAlphaScale: POINT_ALPHA_SCALE,
  shadowColor: SHADOW_COLOR
} = GLOBE_CONFIG;

const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
let width = 0;
let height = 0;
let rotationDeg = 0;

function biasedLatitude() {
  const latScale = Math.random() > POLAR_BIAS_PROBABILITY ? 1 : LAT_FALLOFF;
  return (Math.random() * 180 - 90) * latScale;
}

const points = Array.from({ length: POINT_COUNT }, () => ({
  lat: biasedLatitude(),
  lon: Math.random() * 360,
  speed: BASE_SPEED + Math.random() * SPEED_VARIATION,
  size: BASE_SIZE + Math.random() * SIZE_VARIATION
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
  ctx.save();
  ctx.shadowColor = SHADOW_COLOR;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.lon += p.speed * LONGITUDE_SPEED_MULTIPLIER;
    const { x, y, depth } = project(p.lat, p.lon);
    const alpha = POINT_ALPHA_BASE + depth * POINT_ALPHA_SCALE;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${POINT_COLOR},${alpha})`;
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
  rotationDeg += GLOBE_ROTATION_SPEED;
  requestAnimationFrame(tick);
}

resize();
window.addEventListener("resize", resize);
tick();
