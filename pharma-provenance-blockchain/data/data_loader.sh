
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
 
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "gtin": "gtin1111",
  "product": "org.e599.model.Product#1"
}' 'http://localhost:3000/api/IndividualPackage'

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

# Containers
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Container",
  "gtin": "gtin-cont-1",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": [
    "org.e599.model.IndividualPackage#gtin1111"
  ]
}' 'http://localhost:3000/api/Container'

# Define shipments
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Shipment",
  "sscc": "SSCC-1111",
  "container": "org.e599.model.Container#gtin-cont-1",
  "sendFrom": "org.e599.model.Location#gln2222",
  "sendTo": "org.e599.model.Location#gln3333"
}' 'http://localhost:3000/api/Shipment'

# Execute a delivery transaction.
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Delivery",
  "shipment": "org.e599.model.Shipment#SSCC-1111"
}' 'http://localhost:3000/api/Delivery'


