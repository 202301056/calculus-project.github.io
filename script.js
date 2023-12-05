import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let controls;

let objToRender = 'Missile';

const loader = new GLTFLoader();

loader.load(
  `Missile/scene.gltf`, // Adjust the path to your GLTF model file
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "Missile" ? 1.8 : 10;

const topLight = new THREE.DirectionalLight(0xffffff, 2); 
topLight.position.set(10, 10, 10);
topLight.castShadow = false;
scene.add(topLight);

const bottomlight = new THREE.DirectionalLight(0xffffff, 2); 
bottomlight.position.set(10, 10, 10); 
bottomlight.castShadow = true;
scene.add(bottomlight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "Missile" ? 5 : 1);
scene.add(ambientLight);

// Add OrbitControls
controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === "Missile") {
    object.rotation.y = -3 + (1 - mouseX / window.innerWidth) * 2;
    object.rotation.x = -1.2 + (mouseY / window.innerHeight) * 2.5;
  }

  controls.update(); // Update controls in the animation loop
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();
