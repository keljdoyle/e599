
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
   "productName": "Curitol",  
   "manufacturer": "org.e599.model.SupplyChainPartner#1"  
 }' 'http://localhost:3000/api/Product'

  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "2",  
   "productName": "Flemendrex",  
   "manufacturer": "org.e599.model.SupplyChainPartner#1"  
 }' 'http://localhost:3000/api/Product'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "3",  
   "productName": "Gazundisol PM",  
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

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "B0003",
  "product" : "org.e599.model.Product#3",
  "batchCompletedDate" : "2018-03-04T11:42Z",
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

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Item",
  "GTIN": "GTIN-0002",
  "product": "org.e599.model.Product#3",
  "unitCount" : 100,
  "unit" : "ml",
  "dosage" : 1
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

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0001-0003",
  "item": "org.e599.model.Item#GTIN-0001",
  "batch" : "org.e599.model.Batch#B0001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0002-0001",
  "item": "org.e599.model.Item#GTIN-0002",
  "batch" : "org.e599.model.Batch#B0003"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0002-0002",
  "item": "org.e599.model.Item#GTIN-0002",
  "batch" : "org.e599.model.Batch#B0003"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "GTIN-0002-0003",
  "item": "org.e599.model.Item#GTIN-0002",
  "batch" : "org.e599.model.Batch#B0003"
}' 'http://localhost:3000/api/IndividualPackage'

# Containers
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0001",
  "GTIN": "",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0002",
  "GTIN": "",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0003",
  "GTIN": "",
  "currentLocation": "org.e599.model.Location#gln2222",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '
{
  "index": {
    "fields": [
      {
        "data.eventTime": "asc"
      }
    ]
  },
  "type": "json"
}' 'http://localhost:5984/composerchannel/_index'