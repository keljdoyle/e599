

# Execute packaging transactions
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0001",
  "contents" : ["org.e599.model.IndividualPackage#GTIN-0001-0001", "org.e599.model.IndividualPackage#GTIN-0001-0002"],
  "readPoint": "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/PackageTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0002",
  "contents" : ["org.e599.model.IndividualPackage#GTIN-0002-0001", "org.e599.model.IndividualPackage#GTIN-0002-0002"],
  "readPoint": "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/PackageTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0003",
  "contents" : ["org.e599.model.IndividualPackage#GTIN-0001-0003", "org.e599.model.IndividualPackage#GTIN-0002-0003"],
  "readPoint": "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/PackageTransaction'

# Execute delivery transactions.
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#gln3333"
}' 'http://localhost:3000/api/ReceiveTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0002",
  "readPoint": "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/ShipTransaction'

#Unpack
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.UnpackTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#gln3333"
}' 'http://localhost:3000/api/ReceiveTransaction'
