# React shared-ui lib

Shared ui is a react component lib using ui tailwindcss and material-tailwind package library dynamically built components.

## Deployment

-   Deploys to correct sh and environment yml configurations

## Package Requirements
> **Note:** will add a script for doing this automatically at a later date.
-   [Node.js](https://nodejs.org/) (v22.2.0 or later)
-   `if using @material-tailwind npm run @material-tailwind/react@^2.1.9`
-   `npm run react@>=16`
-   `npm run react-dom@>=16`
-   `npm run --save-dev react-redux@^7.2.5`
-   `npm run --save-dev react-reactive-form@^2.0.1`
-   `npm run --save-dev @mui/base@5.0.0-beta.40`
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

  /* tsconfig.json */
  {
  "compilerOptions": {
    "target": "esnext",
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowJs": false,
    "maxNodeModuleJsDepth": 1,
    "declaration": true,
    "emitDeclarationOnly": true,
    "sourceMap": true,
    "declarationDir": "./types",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": false,
    "noFallthroughCasesInSwitch": false,
    "noUncheckedIndexedAccess": false,
    "allowUnreachableCode": false,
    "skipLibCheck": true,
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "stories",
    "src/**/*.stories.tsx",
    "src/**/*.stories.ts"
  ]
}
```


## Running Shared UI Storybook

To start the lib storybook, run:

```bash
## _build directory
.\shared-ui-storybook.sh
```
or
```bash
## from parent level of ui-shared-lib
 pnpm --filter shared-ui storybook
```

## Dynamic Components
- [Material-Tailwind](src/material-tw/MT.md)


## TODO

-   [ ] Build React Shared UI package to allow developer to install within their react applications
-   [ ] Build UITailwindCSS dynamic components within ui-tw directory
  -   [ ] form types and table components to be built
