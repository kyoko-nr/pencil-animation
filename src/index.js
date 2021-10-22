import './style.css'
import * as THREE from 'three'

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Test cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
)
cube.rotation.set(0.3, 0.3, 0)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Render
renderer.render(scene, camera)