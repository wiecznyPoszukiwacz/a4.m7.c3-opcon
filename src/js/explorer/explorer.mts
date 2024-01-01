/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// explorer

import * as Three from 'three'
import { IScreenContainter } from '../types.mjs'

export class Explorer{

	protected frameLength = 1000/10
	protected previousTime = 0

	public constructor(container: IScreenContainter){
		const width = container.width
		const height = container.height

		const camera = new Three.PerspectiveCamera(70, width/height, 0.01, 100)
		camera.position.z = 1
		camera.position.y = 10
		camera.position.x = 1 

		camera.lookAt(0, 0, 0)

		const scene = new Three.Scene()
		//scene.background = new Three.Color(0xf0f0f0)
		scene.background = new Three.Color(0x000010)

		const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
		const material = new Three.MeshNormalMaterial()
		const mesh = new Three.Mesh(geometry, material)
		const mesh2 = new Three.Mesh(geometry, material)

		mesh.position.x = 2
		mesh.position.y = 2
		scene.add(mesh)

		scene.add(mesh2)

		const planeGeometry = new Three.PlaneGeometry(1000, 1000, 128, 128)
		const planeMaterial = new Three.MeshBasicMaterial({color: 0x444444, side: Three.DoubleSide})

		const textureLoader = new Three.TextureLoader()
		//const texture = textureLoader.load('./assets/uvmap.png')
		const texture = textureLoader.load('./assets/desert-rocks1-albedo.png')
		const bm = textureLoader.load('./assets/desert-rocks1-Height.png')

		texture.wrapS = Three.RepeatWrapping
		texture.wrapT = Three.RepeatWrapping
		texture.repeat.set(128, 128)

		const texMaterial = new Three.MeshPhongMaterial({
			map:texture,
			bumpMap: bm,
			bumpScale: 1.3
		})

		//const plane = new Three.Mesh(planeGeometry, planeMaterial)
		const plane = new Three.Mesh(planeGeometry, texMaterial)

		plane.rotateX(- Math.PI / 2)
		plane.receiveShadow = true
		scene.add(plane)

		// light
		const ambient = new Three.AmbientLight(0xaa8888)
		scene.add(ambient)

		// star



		// const gridHelper = new Three.GridHelper(100, 100, 0xe6e6e6, 0xa0a0a0)
		// gridHelper.position.y += 0.0001
		// scene.add(gridHelper)

		const axesHelper = new Three.AxesHelper(5)
		scene.add(axesHelper)


		const renderer = new Three.WebGLRenderer({antialias: true, alpha: false})
		renderer.setSize(width, height)
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = Three.PCFSoftShadowMap

		
		container.domElement.appendChild(renderer.domElement)
		
		renderer.setAnimationLoop((timestamp: number) => {

			if(timestamp - this.previousTime > this.frameLength){
				renderer.render(scene, camera)
				this.previousTime = timestamp
			}
		})
	}

	protected animate(timestamp: number): void{
		requestAnimationFrame(this.animate.bind(this))
	}


	
}
