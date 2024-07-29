const { execSync } = require('child_process');

// List of dependencies and dev dependencies
const dependencies = [
    'react',
    'react-dom',
    '@heroicons/react',
    '@material-tailwind/html',
    '@material-tailwind/react',
    '@mui/base',
    "@heroicons/react",
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

// Function to install dependencies
function installDependencies(deps, isDev = false) {
    deps.forEach((dep) => {
        const command = isDev ? `npm install --save-dev ${dep}` : `npm install ${dep}`;
        console.log(`Attempting to install ${dep} using command: ${command}`);
        
        try {
            execSync(command, { stdio: 'inherit' });
            console.log(`Successfully installed ${dep} using npm.`);
        } catch (error) {
            console.error(`Failed to install ${dep} using npm. Error: ${error.message}`);
            console.log(`Trying to install ${dep} using pnpm...`);
            
            const pnpmCommand = isDev ? `pnpm add -D ${dep}` : `pnpm add ${dep}`;
            console.log(`Attempting to install ${dep} using command: ${pnpmCommand}`);
            
            try {
                execSync(pnpmCommand, { stdio: 'inherit' });
                console.log(`Successfully installed ${dep} using pnpm.`);
            } catch (pnpmError) {
                console.error(`Failed to install ${dep} using pnpm as well. Error: ${pnpmError.message}`);
                console.log(`Please install ${dep} manually.`);
            }
        }
    });
}

// Install dependencies
console.log('Starting installation of dependencies...');
installDependencies(dependencies);
console.log('Finished installation of dependencies.');

// Install dev dependencies
console.log('Starting installation of dev dependencies...');
installDependencies(devDependencies, true);
console.log('Finished installation of dev dependencies.');
