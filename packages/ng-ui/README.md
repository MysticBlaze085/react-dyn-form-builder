# Angular Shared UI Package

NG UI is a Angular component lib using ui tailwindcss and material-tailwind package library dynamically built components.

## Deployment

-   Deploys to correct sh and environment yml configurations

## Package Requirements
> **Note:** will add a script for doing this automatically at a later date.
-   [Node.js](https://nodejs.org/) (v22.2.0 or later)
-   `if using @material-tailwind npm run @material-tailwind/html@^2.1.9`
-   `npm run --save-dev tailwindcss@^3.4.7`
-   `npm run --save-dev postcss@^8.4.40`

## Installation

```javascript
 /* tailwind.config.js */

import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
        './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
});

/* postcss.config.js */
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }

```

## Running NG UI Storybook

To start the lib storybook, run:

```bash
## from parent level of ui-shared-lib
 pnpm --filter ng-ui storybook
```

## Dynamic Components

## TODO

-   [x] Build components similar to the react shared-ui package
-   [ ] Preference menu if more then 5 columns exists should in a tab like display or create a bigger card so the list creates side by side of groups of
        checkboxes, radios etc
-   [x] Table cell if text too long should allow tooltip display of content
-   [x] Handle array of data types to display string list
-   [x] add the select dropdown back to the table output
-   [ ] handle selected options in the dropdown table select also the selected rows
-   [ ] Write documentation on how to use components
-   [ ] Test install in a standalone application
-   [ ] Write spec tests and storybook interactive testing
-   [ ] Write up different stories for each process I am working on
