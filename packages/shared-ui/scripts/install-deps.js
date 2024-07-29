const { execSync } = require('child_process');

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

// Read dependencies from command line arguments
const args = process.argv.slice(2);
const isDev = args.includes('--dev');
const deps = args.filter((arg) => arg !== '--dev');

installDependencies(deps, isDev);
