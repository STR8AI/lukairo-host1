import * as THREE from 'three';

let scene, camera, renderer, globe;

export function init() {
  const container = document.getElementById('globe-container');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 64, 64);

  // Attempt to load earth texture, fall back to solid color if it fails
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    'images/earth.jpg',
    function (texture) {
      const material = new THREE.MeshStandardMaterial({ map: texture });
      globe = new THREE.Mesh(geometry, material);
      scene.add(globe);
    },
    undefined,
    function () {
      // On error, use solid color
      const material = new THREE.MeshStandardMaterial({ color: 0x2194ce });
      globe = new THREE.Mesh(geometry, material);
      scene.add(globe);
    }
  );
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  window.addEventListener('resize', onWindowResize);
  animate();
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (globe) globe.rotation.y += 0.002;
  renderer.render(scene, camera);
}

// Auto-init when used as an entry script
if (typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', init);
}
