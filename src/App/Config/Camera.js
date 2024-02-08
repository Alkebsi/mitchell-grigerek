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

    if (this.tests.active) {
      this.setInstance(true);
    } else {
      this.setInstance(false);
    }
    this.setOrbitControls();
  }

  setInstance(test) {
    if (!test) {
      this.instanceGroup = new THREE.Group();
      this.aspectRatio = this.sizes.width / this.sizes.height;
      this.instance = new THREE.OrthographicCamera(
        -4 * this.aspectRatio,
        4 * this.aspectRatio,
        4,
        -4,
        0.01,
        1000,
      );
      //this.instance.position.setZ(300);
    } else {
      this.tests.camera = this.tests.world.addFolder('Camera');

      this.instanceGroup = new THREE.Group();
      this.aspectRatio = this.sizes.width / this.sizes.height;

      this.camMode = 'perspective';
      this.camOptions = {
        perspective: new THREE.PerspectiveCamera(
          45,
          this.sizes.width / this.sizes.height,
          0.01,
          100,
        ),
        orthographic: new THREE.OrthographicCamera(
          -2 * this.aspectRatio,
          2 * this.aspectRatio,
          2,
          -2,
          0.01,
          1000,
        ),
      };

      this.instance = this.camOptions.perspective;

      // Adding the tests to the GUI
      this.tests.camera
        .add(this, 'camMode', {
          perspective: 'perspective',
          orthographic: 'orthographic',
        })
        .onChange(() => {
          if (this.camMode === 'perspective') {
            this.instance = this.camOptions.perspective;
            this.setOrbitControls();
          } else {
            this.instance = this.camOptions.orthographic;
            this.setOrbitControls();
          }
        });
    }

    this.instance.position.set(5, 4, 5);
    this.instanceGroup.add(this.instance);
    this.instanceGroup.position.set(0, 0, 0);
    this.scene.add(this.instanceGroup);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 4;
    this.controls.maxPolarAngle = Math.PI * 0.3;
    this.controls.minPolarAngle = Math.PI * 0.1;
    this.controls.minDistance = 3;
    this.controls.maxDistance = Infinity;
    this.controls.enableDamping = true;

    if (this.tests.active) {
      this.setTests();
    }
  }

  setTests() {
    this.controls.autoRotate = false;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minPolarAngle = 0;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();

    if (this.camMode === 'orthographic') {
      this.aspectRatio = this.sizes.width / this.sizes.height;
      this.instance.left = -2 * this.aspectRatio;
      this.instance.right = 2 * this.aspectRatio;
    }
  }

  update() {
    this.controls.update();
  }
}
