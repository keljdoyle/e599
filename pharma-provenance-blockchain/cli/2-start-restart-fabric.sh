
# Pre-reqs:
#   composer-cli                        Core command line tools
#   generator-hyperledger-composer      Generate a project structure like this one.
#   composer-rest-server                REST scaffolding of the DB
#   composer-playground                 Run a UI for easily managing the DB

# Stop and teardown fabric (if installed at root)
# This will delete any cards and the hyperledger db
~/fabric-tools/stopFabric.sh
~/fabric-tools/teardownFabric.sh

# start fabric
~/fabric-tools/startFabric.sh

# Create a peer admin card.
~/fabric-tools/createPeerAdminCard.sh

