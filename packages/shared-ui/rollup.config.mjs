import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import { execSync } from 'child_process';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import packageJson from './package.json' assert { type: 'json' };
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const outputDirCJS = path.resolve(process.cwd(), 'dist/cjs');
const outputDirESM = path.resolve(process.cwd(), 'dist/esm');

console.log('Output directory CJS:', outputDirCJS);
console.log('Output directory ESM:', outputDirESM);

// Run the checkDirectories script
try {
    execSync('node scripts/checkDirectories.js', { stdio: 'inherit' });
} catch (error) {
    console.error('Error running checkDirectories script:', error);
    process.exit(1);
}

const commonPlugins = (dir) => [
    resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        skip: ['react', 'react-dom'],
    }),
    commonjs(),
    typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.ts', '**/*.stories.tsx'],
        outDir: dir,
        declarationDir: `${dir}`,
    }),
    copy({
        targets: [
            { src: './scripts/check-and-install-deps.sh', dest: 'dist' },
            { src: './scripts/install-deps.js', dest: 'dist' },
        ],
    }),
    postcss({ extensions: ['.css'], inject: true, extract: false }),
    generatePackageJson({
        baseContents: {
            name: 'shared-ui',
            version: '1.0.0',
            scripts: {
                postinstall: 'chmod +x ./check-and-install-deps.sh && ./check-and-install-deps.sh',
            },
            dependencies: packageJson.peerDependencies,
            devDependencies: packageJson.devDependencies,
            files: ['check-and-install-deps.sh', 'install-deps.js'],
            private: true,
        },
        outputFolder: 'dist',
    }),
];

const external = ['react', 'react-dom', 'react/jsx-runtime', '@material-tailwind/react', '@mui/base'];

export default [
    // CJS Configuration
    {
        input: 'src/index.ts',
        output: {
            dir: outputDirCJS,
            format: 'cjs',
            sourcemap: true,
        },
        plugins: commonPlugins(outputDirCJS),
        external,
    },
    // ESM Configuration
    {
        input: 'src/index.ts',
        output: {
            dir: outputDirESM,
            format: 'esm',
            sourcemap: true,
        },
        plugins: commonPlugins(outputDirESM),
        external,
    },
];
