import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import App from '../App';

export default class Camera extends THREE.EventDispatcher {
  constructor() {
    super();
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;
    this.canvas = this.app.canvas;
    this.tests = this.app.tests;

    this.setInstance();
    this.setOrbitControls();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setInstance() {
    this.instanceGroup = new THREE.Group();
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.01,
      100,
    );

    this.instance.position.set(5, 4, 5);
    this.instanceGroup.add(this.instance);
    this.instanceGroup.position.set(0, 0, 0);
    this.scene.add(this.instanceGroup);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 4;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minPolarAngle = Math.PI * 0.1;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 10;
    this.controls.enableDamping = true;
  }

  setTests() {
    this.controls.autoRotate = false;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minPolarAngle = 0;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
