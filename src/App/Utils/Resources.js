import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import App from '../App';

export default class Resources {
  constructor(loadingPanel) {
    this.app = new App();
    this.scene = this.app.scene;
    this.interval = this.app.interval;
    this.sizes = this.app.sizes;
    
    this.loadingPanel = loadingPanel;
    this.loadingCaption = this.loadingPanel.children[0];
    this.loadingProgress = this.loadingPanel.children[1];

    this.ready = false;
    this.progress = 0;

    //this.setInstance();
    this.setLoaders();
  }

  setLoaders() {
    this.loadingManager = new THREE.LoadingManager(
      () => {
        // console.log("Elements Loaded");
        this.ready = true;
        this.loadingPanelMgr();
      },
      (itemURL, loadedItems, totalItems) => {
        this.progress = Math.round((loadedItems / totalItems) * 100);
        this.loadingPanelMgr();
        // console.log(`Loading ${this.progress}`);
      }
    );
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.gltfLoader = new GLTFLoader(this.loadingManager);
  }

  loadingPanelMgr() {
    this.loadingCaption.innerHTML = `Loading ${this.progress}%`;

    if (this.ready) {
      this.loadingPanel.style.opacity = 0;
      window.setTimeout(() => {
        this.loadingPanel.style.display = "none";
      }, 2200);
    }
  }
}
