const fs = require('fs');
const path = require('path');

const directories = [path.resolve(__dirname, 'dist/cjs'), path.resolve(__dirname, 'dist/esm')];

directories.forEach((dir) => {
  console.log(`Checking directory: ${dir}`);

  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist. Creating: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }

  fs.access(dir, fs.constants.W_OK, (err) => {
    if (err) {
      console.error(`Directory is not writable: ${dir}`, err);
      process.exit(1);
    } else {
      console.log(`Directory is writable: ${dir}`);
    }
  });
});
