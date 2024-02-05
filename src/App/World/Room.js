import * as THREE from 'three';
import App from '../App';

export default class Room {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;

    this.setRoom();
  }

  setRoom() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
    );
    this.mesh.position.set(0, 0.5, 0);

    this.scene.add(this.mesh);
  }
}
