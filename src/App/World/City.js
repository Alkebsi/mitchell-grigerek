import * as THREE from 'three';
import App from '../App';

export default class City {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;

    this.setCity();
  }

  setCity() {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
    );
    this.mesh.rotation.x = -Math.PI * 0.5;

    this.scene.add(this.mesh);
  }
}
