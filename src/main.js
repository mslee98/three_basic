import * as THREE from 'three'; // esModule 방식임 원래는 Node.js환경에서는 CommonJS형식으로 require('module명')으로 가져왔는데 es6부터 브라우저 Node.js환경에서 import/export로 사용이 가능
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


class Example {
    constructor() {
		this.camera;
		this.scene;
		this.renderer;

		this.init();
        
    }
    
    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1 ,1000);
        
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.shadowMap.enabled = true;

        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.camera.position.z = 10;
        this.camera.position.y = 3;

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(this.directionalLight);

        window.addEventListener('resize', this.resize.bind(this))
        this.setModel()

        this.render()
    }

    setModel() {
        const boxGeo = new THREE.BoxGeometry(4,4,4)
        const boxMat = new THREE.MeshPhongMaterial({
            color: 'gray'
        })

        const boxMesh = new THREE.Mesh(boxGeo, boxMat)
        this.scene.add(boxMesh)
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.render.bind(this))
    }
    
}

window.onload = () => {
    new Example();
}