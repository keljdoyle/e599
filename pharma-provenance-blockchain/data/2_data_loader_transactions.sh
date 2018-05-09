

# Execute packaging transactions
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0001",
  "contents" : ["org.e599.model.IndividualPackage#01-P01-I001-S0001", 
    "org.e599.model.IndividualPackage#01-P01-I001-S0002",
    "org.e599.model.IndividualPackage#01-P01-I001-S0003"
    ],
  "readPoint": "org.e599.model.Location#01-L01",
  "eventTime" : "2018-02-11T03:31:15.000Z"
}' 'http://localhost:3000/api/PackageTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0002",
  "contents" : ["org.e599.model.IndividualPackage#01-P02-I001-S0001", 
    "org.e599.model.IndividualPackage#01-P02-I001-S0002"],
  "readPoint": "org.e599.model.Location#01-L01",
  "eventTime" : "2018-02-12T03:31:15.000Z"
}' 'http://localhost:3000/api/PackageTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0003",
  "contents" : ["org.e599.model.IndividualPackage#01-P03-I001-S0001", 
  "org.e599.model.IndividualPackage#01-P03-I001-S0002",
  "org.e599.model.IndividualPackage#01-P03-I001-S0002",
  "org.e599.model.IndividualPackage#01-P02-I001-S0003"
  ],
  "readPoint": "org.e599.model.Location#01-L01",
  "eventTime" : "2018-02-13T03:31:15.000Z"
}' 'http://localhost:3000/api/PackageTransaction'

# Execute delivery transactions.
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#01-L01",
  "eventTime" : "2018-02-14T03:31:15.000Z"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#02-L01",
  "eventTime" : "2018-02-15T03:31:15.000Z"
}' 'http://localhost:3000/api/ReceiveTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#02-L01",
  "eventTime" : "2018-02-16T03:31:15.000Z"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#03-L01",
  "eventTime" : "2018-02-17T03:31:15.000Z"
}' 'http://localhost:3000/api/ReceiveTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#03-L01",
  "eventTime" : "2018-02-18T03:31:15.000Z"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0002",
  "readPoint": "org.e599.model.Location#01-L01",
  "eventTime" : "2018-02-19T03:31:15.000Z"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#04-L01",
  "eventTime" : "2018-02-20T03:31:15.000Z"
}' 'http://localhost:3000/api/ReceiveTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0002",
  "readPoint": "org.e599.model.Location#04-L01",
  "eventTime" : "2018-02-20T03:31:15.000Z"
}' 'http://localhost:3000/api/ReceiveTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShipTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0002",
  "readPoint": "org.e599.model.Location#04-L01",
  "eventTime" : "2018-02-21T03:31:15.000Z"
}' 'http://localhost:3000/api/ShipTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ReceiveTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#03-L01",
  "eventTime" : "2018-02-22T03:31:15.000Z"
}' 'http://localhost:3000/api/ReceiveTransaction'

#Unpack
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.UnpackTransaction",
  "container": "org.e599.model.ShippingContainer#SSCC-0001",
  "readPoint": "org.e599.model.Location#04-L01",
  "eventTime" : "2018-02-21T03:31:15.000Z"
}' 'http://localhost:3000/api/UnpackTransaction'
