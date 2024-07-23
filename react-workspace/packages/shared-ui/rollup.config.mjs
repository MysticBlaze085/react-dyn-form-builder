import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" assert { type: "json" };

const commonPlugins = (dir) => [
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    skip: ["react", "react-dom"],
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts", "**/*.stories.tsx"],
    outDir: dir,
    declarationDir: `${dir}/types`,
  }),
  postcss({ extensions: [".css"], inject: true, extract: false }),
];

const external = ["react", "react-dom", "react/jsx-runtime", "@material-tailwind/react", "@mui/base"];

export default [
  // CJS Configuration
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins: commonPlugins("dist/cjs"),
    external,
  },
  // ESM Configuration
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
    },
    plugins: commonPlugins("dist/esm"),
    external,
  },
];
