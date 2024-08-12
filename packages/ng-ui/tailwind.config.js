const withMT = require('@material-tailwind/html/utils/withMT');
const sharedTailwindConfig = '../../tailwind-preset/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    presets: [sharedTailwindConfig],
    content: [
        './src/**/*.{html,ts}',
        './src/**/!(*.stories|*.spec).{ts,html}',
        './projects/ng-lib/src/**/!(*.stories|*.spec).{ts,html}',
        './node_modules/@material-tailwind/html/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
});
