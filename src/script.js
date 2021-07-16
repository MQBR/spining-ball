import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Light } from 'three'

//loading
const textureLoader = new THREE.TextureLoader() 

const normalTexture = textureLoader.load('/texture/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new  THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;

material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 6
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(0.69,0.48,1.34)
pointLight2.intensity = 1.2

scene.add(pointLight2)


//PointLight controller
const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.001)
light1.add(pointLight2.position, 'x').min(-3).max(3 ).step(0.001)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.001)
light1.add(pointLight2, 'intensity').min(0).max(3).step(0.0001)

const light1Color ={
    color:0xff8800
}

light1.addColor(light1Color, 'color')
    .onChange(() => { 
            pointLight2.color.set(light1Color.color)
    })

    
//Point Light Helpher
const pointLightHelper =new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()