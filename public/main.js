(() => {
  const sceneEl = document.getElementById("lukairo-scene");
  if (!sceneEl || !window.THREE) {
    return;
  }

  const {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AmbientLight,
    PointLight,
    TextureLoader,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh,
    BufferGeometry,
    Vector3,
    LineBasicMaterial,
    Line,
    BufferAttribute,
    PointsMaterial,
    Points,
  } = THREE;

  const scene = new Scene();
  const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 22;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  sceneEl.appendChild(renderer.domElement);

  const ambient = new AmbientLight(0x00e5d1, 0.4);
  scene.add(ambient);

  const mainLight = new PointLight(0x00e5d1, 1.6, 100);
  scene.add(mainLight);

  const rotatingLight = new PointLight(0x00ffff, 1, 50);
  scene.add(rotatingLight);

  const coreMaterial = new MeshStandardMaterial({
    color: 0x001111,
    metalness: 1,
    roughness: 0.25,
    emissive: 0x001111,
    emissiveIntensity: 0.6,
  });
  const core = new Mesh(new SphereGeometry(3, 64, 64), coreMaterial);
  scene.add(core);

  const loader = new TextureLoader();
  loader.load(
    "LUKAIRO.png",
    texture => {
      coreMaterial.map = texture;
      coreMaterial.needsUpdate = true;
    },
    undefined,
    () => {}
  );

  const systems = [
    { name: "Jobber", orbit: 8, color: 0x00e5d1 },
    { name: "Housecall Pro", orbit: 10, color: 0x00bfff },
    { name: "ServiceTitan", orbit: 12, color: 0x33aaff },
    { name: "Workiz", orbit: 9, color: 0x00ffaa },
    { name: "Others", orbit: 11, color: 0x00ffcc },
  ];

  const nodes = [];
  const beams = [];
  const labels = [];

  systems.forEach((system, index) => {
    const orb = new Mesh(
      new SphereGeometry(0.4, 32, 32),
      new MeshStandardMaterial({
        emissive: system.color,
        emissiveIntensity: 2,
        color: 0x001010,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    orb.userData = {
      orbit: system.orbit,
      phase: index,
      scale: 1,
      dir: 1,
      connected: false,
    };
    scene.add(orb);
    nodes.push(orb);

    const beamGeom = new BufferGeometry().setFromPoints([new Vector3(), new Vector3()]);
    const beamMat = new LineBasicMaterial({ color: system.color, transparent: true, opacity: 0 });
    const beam = new Line(beamGeom, beamMat);
    scene.add(beam);
    beams.push(beam);

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = system.name;
    document.body.appendChild(label);
    labels.push(label);
  });

  const particleGeo = new BufferGeometry();
  const positions = new Float32Array(2500);
  for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }
  particleGeo.setAttribute("position", new BufferAttribute(positions, 3));
  const particles = new Points(
    particleGeo,
    new PointsMaterial({ color: 0x00e5d1, size: 0.05, transparent: true, opacity: 0.4 })
  );
  scene.add(particles);

  const tempVec = new Vector3();

  function animate(timeMs) {
    const t = timeMs * 0.001;

    core.rotation.y += 0.0025;
    core.rotation.x += 0.0012;

    rotatingLight.position.set(
      Math.sin(t * 0.8) * 10,
      Math.cos(t * 0.6) * 5,
      Math.cos(t * 0.9) * 10
    );

    particles.rotation.y += 0.0004;

    nodes.forEach((node, i) => {
      const angle = t * 0.6 + i;
      const pull = Math.sin(t * 0.4 + i) * 0.3;
      const radius = node.userData.orbit - pull;

      node.position.x = Math.sin(angle) * radius;
      node.position.y = Math.cos(angle) * radius;
      node.position.z = Math.sin(t * 0.2 + i) * 1.5;

      node.userData.scale += 0.002 * node.userData.dir;
      if (node.userData.scale > 1.1 || node.userData.scale < 0.9) {
        node.userData.dir *= -1;
      }
      node.scale.setScalar(node.userData.scale);

      const beam = beams[i];
      const dist = node.position.length();
      if (dist < 9) {
        beam.material.opacity = 0.6;
        beam.geometry.setFromPoints([new Vector3(), node.position.clone()]);
        node.userData.connected = true;
      } else if (node.userData.connected) {
        beam.material.opacity *= 0.9;
        if (beam.material.opacity < 0.05) {
          node.userData.connected = false;
          beam.material.opacity = 0;
        }
      }

      tempVec.copy(node.position).project(camera);
      const x = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-tempVec.y * 0.5 + 0.5) * window.innerHeight;
      labels[i].style.left = `${x}px`;
      labels[i].style.top = `${y}px`;
      labels[i].style.opacity = node.userData.connected ? "1" : "0.6";
    });

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", handleResize);
})();
