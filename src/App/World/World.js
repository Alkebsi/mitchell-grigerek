import App from '../App';
import City from './City';
import Room from './Room';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.sizes = this.app.sizes;
    this.tests = this.app.tests;
    this.postprocessing = this.app.postprocessing;

    this.city = new City();
    this.room = new Room();

    this.setUI();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setUI() {
    this.roomBtn = document.querySelector('#room');
    this.roomCondition = false;
    this.cityBtn = document.querySelector('#city');
    this.cityCondition = false;
    this.toggleOutlines = this.app.toggleOutlines;

    this.roomBtn.onclick = () => {
      this.room.enable(!this.roomCondition);
      this.roomCondition = !this.roomCondition;
      this.roomBtn.style.display = 'none';

      this.city.enable(true);
      this.cityCondition = true;
      this.cityBtn.style.display = 'inline';

      this.toggleOutlines.style.display = 'none';
      this.postprocessing.enable(false);
      this.app.outlineCondition = false;
    };

    this.cityBtn.onclick = () => {
      this.city.enable(!this.cityCondition);
      this.cityCondition = !this.cityCondition;
      this.cityBtn.style.display = 'none';

      this.room.enable(false);
      this.roomCondition = false;
      this.roomBtn.style.display = 'inline';

      this.toggleOutlines.style.display = 'inline';
    };
  }

  // eslint-disable-next-line class-methods-use-this
  update() {}

  // eslint-disable-next-line class-methods-use-this
  resize() {}

  // eslint-disable-next-line class-methods-use-this
  setTests() {}
}
