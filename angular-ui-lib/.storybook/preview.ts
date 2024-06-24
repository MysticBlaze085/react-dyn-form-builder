// 📃 .storybook/preview.ts

import { Preview } from '@storybook/angular';

// 👇 Create the viewports used by your application
const customViewport = {
  large: {
    name: 'Large Screen',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  small: {
    name: 'Small Screen',
    styles: {
      width: '800px',
      height: '963px',
    },
  },
};

const preview: Preview = {
  parameters: {
    // 👇 Create the viewports used by your application
    viewport: { viewport: customViewport },
  },
};

export default preview;
