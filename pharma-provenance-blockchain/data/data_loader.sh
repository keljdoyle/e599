


# Add partners
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "1",  
   "companyName": "B.I.G. Pharma"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "2",  
   "companyName": "BigThree Meds Distribution"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "3",  
   "companyName": "Drugs R Us"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "4",  
   "companyName": "Pharma Repackaging Ltd"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

# Currently defining a shipper as a supply chain partner.
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "5",  
   "companyName": "BFD Shippers"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

 # Add products
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "1",  
   "productName": "Burpinol",  
   "manufacturer": "org.e599.model.SupplyChainPartner#1"  
 }' 'http://localhost:3000/api/Product'

  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "2",  
   "productName": "Flemendrex",  
   "manufacturer": "org.e599.model.SupplyChainPartner#1"  
 }' 'http://localhost:3000/api/Product'

# Locations
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "gln": "gln2222",
  "address": "130 west rd. Warwick, RI 02886",
  "company": "org.e599.model.SupplyChainPartner#1" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "gln": "gln3333",
  "address": "22 test rd. Santa Clara, CA 95051",
  "company": "org.e599.model.SupplyChainPartner#2" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "gln": "gln4444",
  "address": "550 Madison ave. New York, NY 10002",
  "company": "org.e599.model.SupplyChainPartner#3"
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "gln": "gln1111",
  "address": "13 Flats Rd. Salt Lake City, UT 84108",
  "company": "org.e599.model.SupplyChainPartner#4" 
}' 'http://localhost:3000/api/Location'

# Batch
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "B0001",
  "product" : "org.e599.model.Product#1",
  "batchCompletedDate" : "2018-01-02T11:42Z",
  "manufactureLocation" : "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/Batch'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "B0002",
  "product" : "org.e599.model.Product#1",
  "batchCompletedDate" : "2018-02-02T11:42Z",
  "manufactureLocation" : "org.e599.model.Location#gln2222"
}' 'http://localhost:3000/api/Batch'

# Individual package
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "gtin": "gtin1111",
  "product": "org.e599.model.Product#1",
  "unitCount" : 500,
  "unit" : "mg",
  "dosage" : 25,
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "gtin": "gtin1112",
  "product": "org.e599.model.Product#1",
  "unitCount" : 500,
  "unit" : "mg",
  "dosage" : 25,
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "gtin": "gtin1113",
  "product": "org.e599.model.Product#1",
  "unitCount" : 500,
  "unit" : "mg",
  "dosage" : 25,
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

# Containers
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Container",
  "gtin": "gtin-cont-1",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": [
    "org.e599.model.IndividualPackage#gtin1111"
  ]
}' 'http://localhost:3000/api/Container'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Container",
  "gtin": "gtin-cont-2",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/Container'

# Define shipments
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Shipment",
  "sscc": "SSCC-1111",
  "container": "org.e599.model.Container#gtin-cont-1",
  "sendFrom": "org.e599.model.Location#gln2222",
  "sendTo": "org.e599.model.Location#gln3333",
  "shipper" : "org.e599.model.SupplyChainPartner#5"
}' 'http://localhost:3000/api/Shipment'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Shipment",
  "sscc": "SSCC-1112",
  "container": "org.e599.model.Container#gtin-cont-1",
  "sendFrom": "org.e599.model.Location#gln3333",
  "sendTo": "org.e599.model.Location#gln4444",
  "shipper" : "org.e599.model.SupplyChainPartner#5"
}' 'http://localhost:3000/api/Shipment'


# Execute packaging transactions
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.Container#gtin-cont-2",
  "contents" : ["org.e599.model.IndividualPackage#gtin1112", "org.e599.model.IndividualPackage#gtin1113"]
}' 'http://localhost:3000/api/PackageTransaction'

# Execute delivery transactions.
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.DeliveryTransaction",
  "shipment": "org.e599.model.Shipment#SSCC-1111"
}' 'http://localhost:3000/api/DeliveryTransaction'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.DeliveryTransaction",
  "shipment": "org.e599.model.Shipment#SSCC-1112"
}' 'http://localhost:3000/api/DeliveryTransaction'
