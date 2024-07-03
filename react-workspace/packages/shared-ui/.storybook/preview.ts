// Import Tailwind CSS
// .storybook/preview.js or .storybook/preview.ts
import '../src/index.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
    loaders: [
        async () => ({
          store: await import('../src/store/index.tsx'),
        }),
    ],
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