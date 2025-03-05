import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// DPR should be set less than 2 or 2 because on mobile and laptop  screen it is not going to make much difference but it will consume more battery and power
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Resize handling
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Add a rotating sphere
const geometry = new THREE.BoxGeometry(1, 1, 3);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  (mouse.x = event.clientX / window.innerWidth),
    (mouse.y = event.clientY / window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.001;
  controls.update();
  cube.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 0.2));
  renderer.render(scene, camera);
}
animate();
