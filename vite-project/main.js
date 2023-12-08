import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// render scene
// always need scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// add object 
// need geometry, material, and mesh
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

/*// Stars Version 1: 
function addStar() {

  const geometry = new THREE.Sphere(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
  const star = new THREE.Mesh(geometry, material);

  // Random positions
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
  star.position.set(x, y, z);
  scene.add(star);
  
}
*/

/*// Stars Version 2
function addStar() {
  // Create a large geometry for instancing
  var geometry = new THREE.SphereGeometry(0.5, 32, 32);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Create a group instance
  var group = new THREE.InstancedMesh(geometry, material, 100);
  scene.add(group);

  // Generate random positions for each instance
  var positions = new Float32Array(300);
  for (var i = 0; i < group.count; i++) {
    var x = Math.random() * 1000 - 500;
    var y = Math.random() * 1000 - 500;
    var z = Math.random() * 2000 - 1000;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  // Set instance positions
  group.setInstancedAttribute('position', positions);
}
*/

function animateStars() {
  // Check if it's time to update stars
  if (frameCount % 100 === 0) {
    // Update star positions
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      var newZPosition = THREE.Math.randFloatSpread(2000) - 1000;
      star.position.z = newZPosition;
    }
  }
}

/* adding stars clears canvas ?? */
/* Array(200).fill().forEach(addStar); */
//addStar();


// function to continuously render object
function animate() {
  requestAnimationFrame(animate);

  //animateStars();

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
