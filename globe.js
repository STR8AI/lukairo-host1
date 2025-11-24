let scene, camera, renderer, globe;

function init() {
  // Check if THREE.js is available
  if (typeof THREE === 'undefined') {
    console.log('Three.js not loaded - displaying fallback image');
    return;
  }
  
  const container = document.getElementById('globe-container');
  
  // Check if container has the image-container child
  const imageContainer = container.querySelector('.image-container');
  if (imageContainer) {
    // Image is already displayed, don't initialize Three.js globe
    console.log('Image mode active - skipping Three.js initialization');
    return;
  }

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
  container.appendChild(renderer.domElement);

  // Globe
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
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

  // Resize
  window.addEventListener('resize', onWindowResize);

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

  globe.rotation.y += 0.003;

  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);
