import { AfterViewInit, Component } from '@angular/core';

import { ReactLoaderService } from './react-loader.service';

@Component({
  selector: 'app-react-test',
  template: '<div id="reactTestContainer"></div>',
})
export class ReactTestComponent implements AfterViewInit {
  constructor(private reactLoader: ReactLoaderService) {}

  ngAfterViewInit() {
    this.reactLoader.loadComponent('ExampleFeature', 'reactTestContainer');
  }
}
