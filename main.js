import './style.css'
import gsap from 'gsap'
/* 
Steps
npm create vite@latest 
vite-plugin-string
npm install gsap --save
*/

import * as THREE from 'https://cdn.skypack.dev/three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl' 
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer(
  {
    antialias: true, //more smooth
    canvas: document.querySelector('canvas')
  }
)

const canvasContainer = document.querySelector('#canvasContainer')



renderer.setPixelRatio(window.devicePixelRatio)

//renderer.setSize(innerWidth,innerHeight)

renderer.setSize(canvasContainer.offsetWidth,
  canvasContainer.offsetHeight)



/* document.body.appendChild(renderer.domElement) */

// create sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/realistic.jpg')
        //value: new THREE.TextureLoader().load('./img/nightdmap.jpg')
        //value: new THREE.TextureLoader().load('./img/nightdmap.jpg')
        //value: new THREE.TextureLoader().load('./img/worldUv.jpg')
        //https://b3d.interplanety.org/en/mapping-texture-to-planet/
        //imgs https://www.solarsystemscope.com/textures/
      }
    }
  })
)

sphere.scale.set(1, 1, 1)

// create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.3, 1.3, 1.3)
scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)


camera.position.z = 15

/* console.log(sphere) */

const mouse = {
  x: undefined,
  y: undefined
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y += 0.006
  group.rotation.y = mouse.x * 0.5
  gsap.to(group.rotation,{
    x: -mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })
}
animate()

addEventListener('mousemove', () =>{
  mouse.x = (event.clientX / innerWidth) * 2 -1
  mouse.y = -(event.clientY / innerHeight) * 2 +1

})

/* console.log(scene) */

