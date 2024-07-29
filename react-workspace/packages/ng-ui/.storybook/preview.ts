import type { Preview } from '@storybook/angular';
import docJson from '../documentation.json';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

setCompodocJson(docJson);

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
        viewport: { viewport: customViewport },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        withThemeByDataAttribute({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
            attributeName: 'data-mode',
        }),
    ],
};

export default preview;
