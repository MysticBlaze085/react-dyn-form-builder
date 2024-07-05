import * as React from 'react';

import ExampleFeature from 'shared-ui-lib/examples/ExampleFeature'; // Update the import path
import { Injectable } from '@angular/core';
import { render } from 'react-dom';

@Injectable({
  providedIn: 'root'
})
export class ReactLoaderService {
  private reactComponents: { [key: string]: React.ComponentType<any> } = {};

  constructor() {
    // Dynamically import your React components
    this.reactComponents['ExampleFeature'] = ExampleFeature;
    // this.reactComponents['MyComponent2'] = require('shared-ui-lib').MyComponent2;
  }

  async loadComponent(componentName: string, elementId: string) {
    if (!this.reactComponents[componentName]) {
      // Adjusted to use an alias if configured in webpack
      const componentModule = await import(`shared-ui-lib/examples/${componentName}`); // Update the import path
      this.reactComponents[componentName] = componentModule.default;
    }

    const Component = this.reactComponents[componentName];
    if (Component) {
      render(React.createElement(Component), document.getElementById(elementId));
    } else {
      console.error(`Component ${componentName} not found`);
    }
  }
}
