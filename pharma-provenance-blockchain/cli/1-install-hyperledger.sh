# Prerequisites: Node.js 8.4 and npm
# Run this to install Hyperledger CLI components before running other scripts.

# Core CLI
npm install -g composer-cli

# Scaffolds the rest server
npm install -g composer-rest-server

# The local playground web site
npm install -g composer-playground

# The generator that is used to build a project structure
npm install -g generator-hyperledger-composer

# install a web socket client for testing events
npm install -g wscat