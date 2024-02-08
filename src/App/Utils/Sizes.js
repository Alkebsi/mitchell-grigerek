import App from '../App';

export default class Sizes {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.logger = this.app.logger;

    this.setSizes();
    this.setDoorsInfo();
    this.getCursorLocation();
  }

  setSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  resize() {
    this.setSizes();
  }

  setDoorsInfo() {
    this.doorsCount = 6;
    this.fakeDoors = 100;
    this.entranceDepth = 1.5;

    if (this.doorsCount % 2 === 1) {
      this.oddDoors = true;
    } else if (this.doorsCount % 2 === 0) {
      this.oddDoors = false;
    } else {
      this.logger.error(
        `The doors count is not set appropriately: ${this.doorsCount}`,
      );
    }
  }

  getCursorLocation() {
    this.mouseLocation = {
      x: 0,
      y: 0,
    };

    window.addEventListener('mousemove', (event) => {
      this.mouseLocation.x = (event.clientX / this.width) * 2 - 1;
      this.mouseLocation.y = (-event.clientY / this.height) * 2 + 1;
    });

    return this.mouseLocation;
  }
}
