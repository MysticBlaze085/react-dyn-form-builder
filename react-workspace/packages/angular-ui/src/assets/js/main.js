// Import your React components
import ExampleFeature from 'shared-ui/example/ExampleFeature';
// Import necessary dependencies and components
import React from 'react';
import ReactDOM from 'react-dom';

// Create a mapping of component names to components
const componentMap = {
  ExampleFeature,
};

// Define the renderReactComponent function
window.renderReactComponent = function (componentName, elementId) {
  const Component = componentMap[componentName];

  if (Component) {
    ReactDOM.render(<Component />, document.getElementById(elementId));
  } else {
    console.error(`Component ${componentName} not found`);
  }
};
