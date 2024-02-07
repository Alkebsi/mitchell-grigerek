import * as THREE from 'three';
import App from '../App';

export default class City {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;
    this.tests = this.app.tests;
    this.resources = this.app.resources;

    this.debugObject = {
      LightAColor: '#69ffca',
      LightBColor: '#003ccf',
    };

    this.setCity();
    this.setLights();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setCity() {
    // Load and import the textures
    // this.cityTexture = this.resources.textureLoader.load('./textures/city-texture.jpg');
    // this.cityTexture.flipY = false;
    this.gradientMap = this.resources.textureLoader.load('./textures/3.jpg');
    this.gradientMap.minFilter = THREE.NearestFilter;

    // Load and import the models
    this.resources.gltfLoader.load('/models/city-unwrapped.glb', (gltf) => {
      this.cityMaterial = new THREE.MeshToonMaterial({
        color: 0xffffff,
        gradientMap: this.gradientMap,
        // map: this.cityTexture, // Not as expected!
      });

      this.city = gltf.scene;
      this.city.traverse((obj) => {
        obj.material = this.cityMaterial;
      });

      this.city.children[1].material = new THREE.MeshBasicMaterial({ color: 0x111111 });

      // this.room.position.set(0, -0.65, 0);
      this.scene.add(this.city);
    });
  }

  setLights() {
    this.lightA = new THREE.DirectionalLight(3);
    this.lightA.color.set(this.debugObject.LightAColor);
    this.lightA.position.set(2, 0, -2);

    this.lightB = new THREE.DirectionalLight(3);
    this.lightB.color.set(this.debugObject.LightBColor);
    this.lightB.position.set(-2, 0, 2);

    this.scene.add(this.lightA, this.lightB);
  }

  setHelpers() {
    this.lightAHelper = new THREE.DirectionalLightHelper(this.lightA);
    this.lightBHelper = new THREE.DirectionalLightHelper(this.lightB);
    this.scene.add(this.lightAHelper, this.lightBHelper, new THREE.AxesHelper());
  }

  setTests() {
    this.setHelpers();
    this.tests.city = this.tests.world.addFolder('City');

    this.tests.city
      .addColor(this.debugObject, 'LightAColor')
      .name('LightAColor')
      .onChange(() => {
        this.lightA.color.set(this.debugObject.LightAColor);
      });
    this.tests.city.add(this.lightA, 'intensity', 0, 10, 0.01);
    this.tests.city
      .addColor(this.debugObject, 'LightBColor')
      .name('LightBColor')
      .onChange(() => {
        this.lightB.color.set(this.debugObject.LightBColor);
      });
    this.tests.city.add(this.lightB, 'intensity', 0, 10, 0.01);
  }
}
