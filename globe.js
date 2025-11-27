// Enhanced globe.js with overlay hide, keyboard pause, sRGB, tone mapping, and optional controls.

let scene, camera, renderer, globe;
let rotateEnabled = true;

function init() {
  const container = document.getElementById('globe-container');

  // Scene
  scene = new THREE.Scene();

  // Camera
  const aspect = container.clientWidth / container.clientHeight;
camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
camera.position.set(0, 0, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // Color management improvements
  if (renderer.outputEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  if (renderer.toneMapping !== undefined) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
  }
  container.appendChild(renderer.domElement);

  // Globe geometry
  const geometry = new THREE.SphereGeometry(1, 64, 64);

  // Texture loading
  const textureLoader = new THREE.TextureLoader();
  let material;

  textureLoader.load(
    'images/earth.jpg',
    function (texture) {
      material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.1
      });
      globe.material = material;

      // Hide loading overlay when texture is ready
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.add('loaded');
    },
    undefined,
    function (error) {
      console.log('No texture found, using solid color');
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.add('loaded');
    }
  );

  // Default solid color material (until texture loads)
  material = new THREE.MeshStandardMaterial({
    color: 0x1e90ff,
    roughness: 0.8,
    metalness: 0.1
  });
globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 3, 5);
  scene.add(dirLight);

  // Optional: OrbitControls (requires loading from Three.js examples)
  // To enable, add this script tag in index.html before globe.js:
  // <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/examples/js/controls/OrbitControls.js"></script>
  /*
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 1.5;
  controls.maxDistance = 8;
  controls.update();
  */

  // Resize
  window.addEventListener('resize', onWindowResize);

  // Pause/Resume rotation with Spacebar
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      rotateEnabled = !rotateEnabled;
    }
  });

  animate();
}

function onWindowResize() {
  const container = document.getElementById('globe-container');
  if (!container) return;

  camera.aspect = container.clientWidth / container.clientHeight;
camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (rotateEnabled) {
    globe.rotation.y += 0.003;
  }

  // If using controls, call controls.update() here.

  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);