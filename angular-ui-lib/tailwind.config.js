const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const sharedTailwindConfig = '../tailwind-preset/tailwind.config.js';
const withMT = require("@material-tailwind/html/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  presets: [sharedTailwindConfig],
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), join(__dirname, 'formly-tailwind-fields/src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  plugins: [],
});
