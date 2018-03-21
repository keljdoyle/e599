# CREATE .bna at solution folder
# Run this in the solution folder.
# This will create a .bna file based on the project structure.
# The generated can then be loaded to a playground or installed via CLI.
composer archive create -t dir -n .

# INSTALL the composer runtime from the archive. note the name to match the .bna file
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName pharma-provenance-blockchain

# Deploy the archive file.
# Run this from the project root folder.
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile pharma-provenance-blockchain@0.0.1.bna --file networkadmin.card

# PING business network to see if it is running.
composer network ping --card admin@pharma-provenance-blockchain
