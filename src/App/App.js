// Three.js
import { Scene } from 'three';

// Utils
import Logger from './Utils/Logger';
import Tests from './Utils/Tests';
import Sizes from './Utils/Sizes';
import Interval from './Utils/Interval';
import Resources from './Utils/Resources';

// Three.js Configurations
import Camera from './Config/Camera';
import Renderer from './Config/Renderer';
import Postprocessing from './Config/Postprocessing';

// Three.js Visual Assets
import World from './World/World';

let instance = null; // this is the variable used inside the SiteManager class

export default class App {
  constructor(canvas) {
    // Checking if it was called once before
    if (instance) {
      // eslint-disable-next-line no-constructor-return
      return instance;
    }
    instance = this;

    // Parameters
    this.canvas = canvas;

    // Logger
    this.logger = new Logger();

    // Fetching Utils
    this.tests = new Tests();
    this.sizes = new Sizes();
    this.interval = new Interval();
    this.resources = new Resources();

    // Creating the Scene
    this.scene = new Scene();

    // Fetching Three.js Elements
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.postprocessing = new Postprocessing();
    this.setUI();

    this.world = new World();

    // Calling Methods
    window.addEventListener('resize', () => {
      this.resize();
    });
    requestAnimationFrame(() => {
      this.update();
    });

    if (this.tests.active) {
      window.app = this; // needed for testing only
    }

    // Finall Log
    this.logger.info('Site is ready');
  }

  // Add the functionality of the buttons
  setUI() {
    this.toggleOutlines = document.querySelector('#outlines');
    this.outlineCondition = false;
    this.toggleOutlines.onclick = () => {
      this.postprocessing.enable(!this.outlineCondition);
      this.outlineCondition = !this.outlineCondition;
    };
  }

  // Called once the page is resized
  resize() {
    this.sizes.resize();
    this.camera.resize();
    this.postprocessing.resize();
    this.renderer.resize(); // This line is a must
    this.world.resize();
  }

  // Called every frame (60fps)
  update() {
    if (this.tests.active) {
      this.tests.stats.begin();
      this.interval.update();
      this.camera.update();
      this.world.update();
      this.postprocessing.update();
      // this.renderer.update(); // Not in need if passes are being used.
      this.tests.stats.end();
    } else {
      this.interval.update();
      this.camera.update();
      this.world.update();
      this.postprocessing.update();
      // this.renderer.update(); // Not in need if passes are being used.
    }

    requestAnimationFrame(() => {
      this.update();
    });
  }
}
