const { execSync } = require('child_process');

// List of dependencies and dev dependencies
const dependencies = [
    'react',
    'react-dom',
    '@heroicons/react',
    '@material-tailwind/html',
    '@material-tailwind/react',
    '@mui/base',
    // Add other dependencies here
];

const devDependencies = [
    'addon-redux',
    'tailwindcss',
    '@emotion/react',
    '@emotion/styled',
    '@reduxjs/toolkit',
    '@types/react',
    '@types/react-dom',
    // Add other dev dependencies here
];

// Install dependencies
dependencies.forEach((dep) => {
    execSync(`npm install ${dep}`, { stdio: 'inherit' });
});

// Install dev dependencies
devDependencies.forEach((dep) => {
    execSync(`npm install --save-dev ${dep}`, { stdio: 'inherit' });
});
