#!/bin/bash
set -e

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
    npm ls "$pkg" --depth=0 >/dev/null 2>&1 || pnpm ls "$pkg" --depth=0 >/dev/null 2>&1
}

# Install missing dependencies with pnpm or npm
install_missing_deps() {
    local deps=("$@")
    if [ ${#deps[@]} -eq 0 ]; then
        echo "No dependencies to install."
        return
    fi
    echo "Installing dependencies: ${deps[*]}"
    
    if command -v pnpm >/dev/null 2>&1; then
        pnpm add "${deps[@]}"
    elif command -v npm >/dev/null 2>&1; then
        npm install "${deps[@]}"
    else
        echo "Neither pnpm nor npm is installed."
        exit 1
    fi
}

# Install missing dev dependencies with pnpm or npm
install_missing_dev_deps() {
    local dev_deps=("$@")
    if [ ${#dev_deps[@]} -eq 0 ]; then
        echo "No dev dependencies to install."
        return
    fi
    echo "Installing dev dependencies: ${dev_deps[*]}"
    
    if command -v pnpm >/dev/null 2>&1; then
        pnpm add --save-dev "${dev_deps[@]}"
    elif command -v npm >/dev/null 2>&1; then
        npm install --save-dev "${dev_deps[@]}"
    else
        echo "Neither pnpm nor npm is installed."
        exit 1
    fi
}

# Check and install dependencies
echo "Checking dependencies..."
missing_deps=()
for dep in "${dependencies[@]}"; do
    if ! check_installed "$dep"; then
        missing_deps+=("$dep")
    fi
done
install_missing_deps "${missing_deps[@]}"

# Check and install dev dependencies
echo "Checking dev dependencies..."
missing_dev_deps=()
for devDep in "${devDependencies[@]}"; do
    if ! check_installed "$devDep"; then
        missing_dev_deps+=("$devDep")
    fi
done
install_missing_dev_deps "${missing_dev_deps[@]}"
