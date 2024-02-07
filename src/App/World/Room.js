import * as THREE from 'three';
import App from '../App';

export default class Room {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;
    this.resources = this.app.resources;
    this.tests = this.app.tests;

    this.debugObject = {
      LightAColor: '#b30a4f',
      LightBColor: '#15d8f2',
    };

    this.setRoom();
    this.setLights();
    this.setFloor();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setRoom() {
    this.resources.gltfLoader.load('/models/room.glb', (gltf) => {
      this.room = gltf.scene;
      this.room.position.set(0, -0.65, 0);
      this.scene.add(gltf.scene);
    });
  }

  setLights() {
    this.lightA = new THREE.DirectionalLight(3);
    this.lightA.color.set(this.debugObject.LightAColor);
    this.lightA.position.set(2, -1, 0);

    this.lightB = new THREE.DirectionalLight(3);
    this.lightB.color.set(this.debugObject.LightBColor);
    this.lightB.position.set(0, 2, 2);

    this.scene.add(this.lightA, this.lightB);
  }

  setFloor() {
    this.floor = new THREE.Mesh(
      new THREE.BoxGeometry(64, 1, 64),
      new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.3,
        metalness: 1,
      }),
    );

    this.floor.position.set(0, -0.5, 0);

    this.scene.add(this.floor);
  }

  setHelpers() {
    this.lightAHelper = new THREE.DirectionalLightHelper(this.lightA);
    this.lightBHelper = new THREE.DirectionalLightHelper(this.lightB);
    this.scene.add(this.lightAHelper, this.lightBHelper, new THREE.AxesHelper());
  }

  setTests() {
    this.setHelpers();
    this.tests.room = this.tests.world.addFolder('Room');

    this.tests.room
      .addColor(this.debugObject, 'LightAColor')
      .name('LightAColor')
      .onChange(() => {
        this.lightA.color.set(this.debugObject.LightAColor);
      });
    this.tests.room.add(this.lightA, 'intensity', 0, 10, 0.01);
    this.tests.room
      .addColor(this.debugObject, 'LightBColor')
      .name('LightBColor')
      .onChange(() => {
        this.lightB.color.set(this.debugObject.LightBColor);
      });
    this.tests.room.add(this.lightB, 'intensity', 0, 10, 0.01);
  }
}
