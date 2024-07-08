import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// scene
const scene = new THREE.Scene();

// import own 3d model
const loader = new GLTFLoader();
loader.load( 'frog.glb', function (gltf) {
  scene.add(  gltf.scene );
}, undefined, function ( error ) {
  console.error ( error );
});

// // create sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//   color: "#00ff83"
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add (mesh)

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
// lights
const light = new THREE.PointLight(0xffffff, 100, 100, 1.7)
const underlight = new THREE.PointLight(0xffffff, 100, 100, 1.7)
const backlight = new THREE.PointLight(0xffffff, 100, 100, 1.7)
const frontlight = new THREE.PointLight(0xffffff, 100, 100, 1.7)
light.position.set(0, 10, -5)
underlight.position.set(0, -10, -5)
backlight.position.set(0, 10, 10)
frontlight.position.set(0, 20, -10)
scene.add(light, underlight, backlight, frontlight)

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotate = 5

// resize
window.addEventListener("resize", () =>{
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.updateProjectionMatrix
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop()
