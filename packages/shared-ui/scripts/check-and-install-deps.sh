#!/bin/bash

# Ensure Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "Node.js is not installed. Please install Node.js to continue."
    exit 1
fi

# Ensure pnpm or npm is installed
if ! command -v pnpm >/dev/null 2>&1 && ! command -v npm >/dev/null 2>&1; then
    echo "Neither pnpm nor npm is installed. Please install one of them to continue."
    exit 1
fi

# Change to the directory of your Node.js project
cd "$(dirname "$0")" || exit

# Check if package.json exists, create if it doesn't
if [ ! -f package.json ]; then
    echo "Creating package.json..."
    if command -v pnpm >/dev/null 2>&1; then
        pnpm init -y
    else
        npm init -y
    fi
fi

# Extract the project name from package.json
PROJECT_NAME=$(grep -oP '(?<="name": ")[^"]*' package.json)
echo "Project name: $PROJECT_NAME"

# Determine the package manager to use
if [ -f pnpm-lock.yaml ]; then
    PACKAGE_MANAGER="pnpm"
elif [ -f package-lock.json ]; then
    PACKAGE_MANAGER="npm"
else
    # Default to npm if no lock file is found
    PACKAGE_MANAGER="npm"
fi

echo "Using $PACKAGE_MANAGER as the package manager."

# Run the Node.js script to install dependencies
node install-deps.js