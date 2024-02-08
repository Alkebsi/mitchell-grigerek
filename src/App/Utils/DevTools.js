import eruda from 'eruda';
import App from '../App'

export default class DevTools {
  constructor() {
    this.app = new App();
    this.tests = this.app.tests;
    
    if (this.tests.active && this.tests.isMobile) {
      eruda.init();
    }
  }
}