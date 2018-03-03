# NOTE!!: This can be used to scaffold a basic asset mgmt web app.
# Once it has been scaffolded it can be modified as needed.
# Be wary of committing the scaffolded code to Git if it has been manually modified.

# Use this to scaffold an Angular UI over the REST server
# You will be prompted for settings.
# Do you want to connect to a running Business Network? No
# Project name: angular-app
# Description: Hyperledger Composer Angular project
# Author name: kd
# Author email: keljdoyle@gmail.com
# License: Apache-2.0
# Business network archive file (Path from the current working directory): pharma-provenance-blockchain@0.0.1.bna
# REST server address: http://localhost
# REST server port: 3000
# Are namespaces used in the generated REST API: Namespaces are not used
yo hyperledger-composer:angular

# Change to the folder that was just scaffolded
cd angular-app

# Start the app
npm start

# The default server should be running at http://localhost:4200
