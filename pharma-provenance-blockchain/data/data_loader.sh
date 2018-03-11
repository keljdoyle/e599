
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

# Locations
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "gln2222",
  "address": "130 west rd. Warwick, RI 02886",
  "company": "org.e599.model.SupplyChainPartner#1" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "gln3333",
  "address": "22 test rd. Santa Clara, CA 95051",
  "company": "org.e599.model.SupplyChainPartner#2" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "gln4444",
  "address": "550 Madison ave. New York, NY 10002",
  "company": "org.e599.model.SupplyChainPartner#3"
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "gln1111",
  "address": "13 Flats Rd. Salt Lake City, UT 84108",
  "company": "org.e599.model.SupplyChainPartner#4" 
}' 'http://localhost:3000/api/Location'

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

# Add Items 
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Item",
  "GTIN": "GTIN-0001",
  "product": "org.e599.model.Product#1",
  "unitCount" : 500,
  "unit" : "mg",
  "dosage" : 25
}' 'http://localhost:3000/api/Item'

# Individual package
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0001-0001",
  "item": "org.e599.model.Item#GTIN-0001",
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0001-0002",
  "item": "org.e599.model.Item#GTIN-0001",
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

# Containers
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0001",
  "GTIN": "GTIN-0001",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0002",
  "GTIN": "GTIN-0001",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'


# Execute packaging transactions
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.PackageTransaction",
  "container" : "org.e599.model.ShippingContainer#SSCC-0001",
  "contents" : ["org.e599.model.IndividualPackage#GTIN-0001-0001", "org.e599.model.IndividualPackage#GTIN-0001-0002"],
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

