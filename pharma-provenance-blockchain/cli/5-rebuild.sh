# recreate the archive after updating models
composer archive create --sourceType dir --sourceName . -a pharma-provenance-blockchain@0.0.1.bna

# Update the business network with the new .bna file
composer network update -a pharma-provenance-blockchain@0.0.1.bna -c admin@pharma-provenance-blockchain

# Re-start the REST server.
composer-rest-server -c admin@pharma-provenance-blockchain -n never -w true
