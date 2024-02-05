import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import App from '../App';

export default class Resources {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.interval = this.app.interval;
    this.sizes = this.app.sizes;

    this.setLoaders();
  }

  setLoaders() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader();
    this.gltfLoader = new GLTFLoader();
  }
}
