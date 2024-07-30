console.log('Running install-deps script...');
const readline = require('readline');
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask questions
const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

// Function to display a list of choices and get the user's selection
const askSelect = async (question, choices) => {
    console.log(question);
    choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
    });
    const answer = await askQuestion('Enter the numbers of your choices (comma separated for multiple selections): ');
    const selectedIndexes = answer.split(',').map((num) => parseInt(num.trim(), 10) - 1);
    return selectedIndexes.map((index) => choices[index]).filter(Boolean);
};

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

(async () => {
    // Ask for packages to install from dependencies
    const selectedDependencies = await askSelect('Select the dependencies you want to install:', dependencies);

    // Ask for packages to install from dev dependencies
    const selectedDevDependencies = await askSelect('Select the devDependencies you want to install:', devDependencies);

    // Install selected dependencies
    console.log('Starting installation of dependencies...');
    installDependencies(selectedDependencies, false);
    console.log('Finished installation of dependencies.');

    // Install selected dev dependencies
    console.log('Starting installation of devDependencies...');
    installDependencies(selectedDevDependencies, true);
    console.log('Finished installation of devDependencies.');

    rl.close();
})();
