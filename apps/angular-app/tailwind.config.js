import { join } from 'path';
import sharedTailwindConfig from './tailwind-preset/tailwind.config';
import withMT from '@material-tailwind/html/utils/withMT';

/** @type {import('tailwindcss').Config} */
const config = withMT({
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    './node_modules/@material-tailwind/html/**/*.{js,ts}',
  ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms')],
});

export default config;
