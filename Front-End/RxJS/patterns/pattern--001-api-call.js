
import { ApiService } from './pattern--001-api-service.js';

export class DemoComponent {

  data = {};

  constructor() {
    this.apiService = new ApiService();
    this.apiService.data.subscribe(this.handleData.bind(this));
  }

  handleData = (data) => {
    this.data = data;
    console.log('--- data recieved: ', data);
  };

  triggerGetData = () => {
    this.apiService.getCatFactData();
    console.log('--- data requested');
  };

}

const demo = new DemoComponent();
setTimeout(() => {
  demo.triggerGetData();
}, 500);
