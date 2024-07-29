#!/bin/bash

# List of dependencies
dependencies=(
    'react'
    'react-dom'
    # Add other dependencies here
)

# List of dev dependencies
devDependencies=(
    '@emotion/react'
    '@emotion/styled'
    '@reduxjs/toolkit'
    '@types/react'
    '@types/react-dom'
    # Add other dev dependencies here
)

# Function to check if a package is installed
check_installed() {
    local pkg="$1"
    if npm ls "$pkg" --depth=0 >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Check and prompt for dependencies
echo "Checking dependencies..."

missing_deps=""
for dep in "${dependencies[@]}"; do
    if ! check_installed "$dep"; then
        missing_deps="$missing_deps $dep"
    fi
done

if [ -n "$missing_deps" ]; then
    read -p "Some dependencies are missing: $missing_deps. Do you want to install them? [Y/n] " yn
    case $yn in
        [Yy]* ) 
            echo "Installing dependencies..."
            node install-deps.js $missing_deps
            ;;
        * )
            echo "Skipping installation of missing dependencies."
            ;;
    esac
else
    echo "All dependencies are installed."
fi

# Check and prompt for dev dependencies
echo "Checking dev dependencies..."

missing_dev_deps=""
for devDep in "${devDependencies[@]}"; do
    if ! check_installed "$devDep"; then
        missing_dev_deps="$missing_dev_deps $devDep"
    fi
done

if [ -n "$missing_dev_deps" ]; then
    read -p "Some dev dependencies are missing: $missing_dev_deps. Do you want to install them? [Y/n] " yn
    case $yn in
        [Yy]* ) 
            echo "Installing dev dependencies..."
            node install-deps.js $missing_dev_deps --dev
            ;;
        * )
            echo "Skipping installation of missing dev dependencies."
            ;;
    esac
else
    echo "All dev dependencies are installed."
fi