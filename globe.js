let scene, camera, renderer, globe;

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
  container.appendChild(renderer.domElement);

  // Globe with texture support
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  
  // Try to load texture, fallback to solid color if not available
  const textureLoader = new THREE.TextureLoader();
  let material;
  
  // Attempt to load earth texture
  textureLoader.load(
    'images/earth.jpg',
    function(texture) {
      // Success - use texture
      material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.1
      });
      globe.material = material;
    },
    undefined,
    function(error) {
      // Error or not found - use solid color (already set)
      console.log('No texture found, using solid color');
    }
  );
  
  // Create globe with default material (will be replaced if texture loads)
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
