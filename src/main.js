import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

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
document.body.appendChild(renderer.domElement);

// Resize handling
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./earth.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

const texture2 = textureLoader.load("./Clouds.png");
texture2.colorSpace = THREE.SRGBColorSpace;

// Add a rotating sphere
const geometry = new THREE.SphereGeometry(1, 200, 200);
const material = new THREE.MeshPhysicalMaterial({
  map: texture,
});
const sphere = new THREE.Mesh(geometry, material);

const cloudGeo = new THREE.SphereGeometry(1.01, 200, 200);
const material2 = new THREE.MeshPhysicalMaterial({
  alphaMap: texture2,
});
material2.transparent = true;
const clouds = new THREE.Mesh(cloudGeo, material2)

scene.add(sphere);
scene.add(clouds);
camera.position.z = 3;

const hdriLoader = new RGBELoader();
hdriLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/qwantani_night_2k.hdr', (hdriTexture) => {
  hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdriTexture;
  // scene.background = hdriTexture;
})

// const light = new THREE.DirectionalLight( 0xfff, 10 );
// // const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
// light.position.set(1,2,3)
// scene.add( light );

// const helper = new THREE.DirectionalLightHelper( light, .8 );
// scene.add( helper );

const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.001;
  clouds.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}
animate();
