import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/static/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Model
let mixer = null
gltfLoader.load(
  '/static/pencil_merged_animate.glb',
  (gltf) => {
    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])
    action.play()
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene.position.set(0, -1, 0)
    scene.add(gltf.scene)
  }
)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
dirLight.position.set(0, 0, 6)
scene.add(dirLight)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()
let previousTime = 0
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  if(mixer) {
    mixer.update(deltaTime)
  }

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()