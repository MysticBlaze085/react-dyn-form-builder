// Import Tailwind CSS
// .storybook/preview.js or .storybook/preview.ts

import "../src/styles/tailwind.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
