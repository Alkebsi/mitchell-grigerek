import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import CustomOutlinePass from './CustomOutlinePass';
import FindSurfaces from './FindSurfaces';

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

    this.outlinePass = new CustomOutlinePass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      this.scene,
      this.camera.instance,
    );
    // this.effectComposer.addPass(this.outlinePass);

    this.effectFXAA = new ShaderPass(FXAAShader);
    // eslint-disable-next-line dot-notation
    this.effectFXAA.uniforms['resolution'].value.set(1 / this.sizes.width, 1 / this.sizes.height);
    // this.effectComposer.addPass(this.effectFXAA);

    this.surfaceFinder = new FindSurfaces();
  }

  addSurfaceIdAttributeToMesh(scene) {
    this.surfaceFinder.surfaceId = 0;

    scene.traverse((node) => {
      if (node.type === 'Mesh') {
        const colorsTypedArray = this.surfaceFinder.getSurfaceIdAttribute(node);
        node.geometry.setAttribute('color', new THREE.BufferAttribute(colorsTypedArray, 4));
      }
    });

    this.outlinePass.updateMaxSurfaceId(this.surfaceFinder.surfaceId + 1);
  }

  enable(condition) {
    if (!condition) {
      this.effectComposer.removePass(this.outlinePass);
      this.effectComposer.removePass(this.effectFXAA);
    } else {
      this.effectComposer.addPass(this.outlinePass);
      this.effectComposer.addPass(this.effectFXAA);
    }
  }

  resize() {
    this.outlinePass.setSize(this.sizes.width, this.sizes.height);
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.effectComposer.render();
  }
}
