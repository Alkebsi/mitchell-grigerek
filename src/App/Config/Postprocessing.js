import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import App from '../App';

export default class Postprocessing {
  constructor() {
    this.app = new App();
    this.sizes = this.app.sizes;
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.scene = this.app.scene;
    this.tests = this.app.tests;
    
    this.setComposer();
  }
  
  setComposer() {
    this.effectComposer = new EffectComposer(this.renderer.instance);
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio);
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);
    
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.effectComposer.addPass(this.renderPass);

    // this.outlinePass = new OutlinePass();
    //this.effectComposer.addPass(this.outlinePass);
  }
  
  update() {
    this.effectComposer.render();
  }
}