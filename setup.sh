#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Check for Node.js and install if necessary
install_nodejs() {
    if command_exists node && command_exists npm; then
        echo "Node.js is already installed."
    else
        echo "Node.js not found, installing..."
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
}

# Step 2: Create project directory and navigate into it
create_project_directory() {
    echo "Creating project directory..."
    mkdir -p google-search-backend
    cd google-search-backend || exit
}

# Step 3: Download server.js, index.html, and styles.css from GitHub
download_files() {
    echo "Downloading server.js, index.html, and styles.css from GitHub..."

    # Download server.js
    curl -o server.js https://raw.githubusercontent.com/SirMrPickle/GPT-Front/refs/heads/main/server.js

    # Download index.html
    curl -o index.html https://raw.githubusercontent.com/SirMrPickle/GPT-Front/refs/heads/main/index.html

    # Download styles.css
    curl -o styles.css https://raw.githubusercontent.com/SirMrPickle/GPT-Front/refs/heads/main/styles.css

    echo "Files downloaded successfully!"
}

# Step 4: Initialize Node.js project and install dependencies
setup_node_project() {
    echo "Setting up Node.js project..."
    if [ ! -f package.json ]; then
        npm init -y
    fi
    npm install express cors body-parser
}

# No server auto-start, the server will be started by the "Advertising" button
echo "Setup completed. The server can be started and stopped using the webpage buttons."