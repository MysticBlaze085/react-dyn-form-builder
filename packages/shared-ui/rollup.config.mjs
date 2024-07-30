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
    // copy({
    //     targets: [{ src: './scripts/install-deps.js', dest: 'dist' }],
    // }),
    postcss({ extensions: ['.css'], inject: true, extract: false }),
    generatePackageJson({
        baseContents: {
            name: 'shared-ui',
            version: '1.0.0',
            // scripts: {
            //     postinstall: "chmod +x install-deps.js && timeout 300s node install-deps.js || echo 'Postinstall script timed out'",
            // },
            // files: ['install-deps.js', 'cjs', 'esm'],
            files: ['cjs', 'esm'],
            private: true,
            dependencies: packageJson.peerDependencies,
            devDependencies: packageJson.devDependencies,
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
