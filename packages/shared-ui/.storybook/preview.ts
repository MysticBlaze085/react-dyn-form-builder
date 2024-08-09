// Import Tailwind CSS
// .storybook/preview.js or .storybook/preview.ts
import '../src/index.css';

import type { Preview } from '@storybook/react';

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
    loaders: [
        async () => ({
            store: await import('../src/store/index.tsx'),
        }),
    ],
    parameters: {
        viewport: { viewport: customViewport },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
