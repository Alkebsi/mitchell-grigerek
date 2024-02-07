import App from '../App';
import City from './City';
import Room from './Room';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;
    this.tests = this.app.tests;

    this.city = new City();
    // this.room = new Room();

    if (this.tests.active) {
      this.setTests();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}

  // eslint-disable-next-line class-methods-use-this
  resize() {}

  // eslint-disable-next-line class-methods-use-this
  setTests() {}
}
