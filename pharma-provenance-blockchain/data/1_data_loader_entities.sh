
# Add partners
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "01",  
   "companyName": "B.I.G. Pharma"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "02",  
   "companyName": "BigThree Meds Distribution"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "03",  
   "companyName": "Pharma Repackaging Ltd"  
 }' 'http://localhost:3000/api/SupplyChainPartner'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.SupplyChainPartner",  
   "partnerId": "04",  
   "companyName": "Drugs R Us"  
 }' 'http://localhost:3000/api/SupplyChainPartner'


# Locations
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "01-L01",
  "address": "23 State St. Madison, CA 95653",
  "company": "org.e599.model.SupplyChainPartner#01" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "01-L02",
  "address": "130 west rd. Warwick, RI 02886",
  "company": "org.e599.model.SupplyChainPartner#01" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "02-L01",
  "address": "22 test rd. Santa Clara, CA 95051",
  "company": "org.e599.model.SupplyChainPartner#02" 
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "03-L01",
  "address": "550 Madison ave. New York, NY 10002",
  "company": "org.e599.model.SupplyChainPartner#03"
}' 'http://localhost:3000/api/Location'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Location",
  "GLN": "04-L01",
  "address": "13 Flats Rd. Salt Lake City, UT 84108",
  "company": "org.e599.model.SupplyChainPartner#04" 
}' 'http://localhost:3000/api/Location'



 # Add products
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "01-P01",  
   "productName": "Curitol",  
   "manufacturer": "org.e599.model.SupplyChainPartner#01"  
 }' 'http://localhost:3000/api/Product'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "01-P02",  
   "productName": "Gazundisol PM",  
   "manufacturer": "org.e599.model.SupplyChainPartner#01"  
 }' 'http://localhost:3000/api/Product'

  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{  
   "$class": "org.e599.model.Product",  
   "productId": "01-P03",  
   "productName": "Flemendrex",  
   "manufacturer": "org.e599.model.SupplyChainPartner#01"  
 }' 'http://localhost:3000/api/Product'
 

 
# Batch
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "01-P01-B001",
  "product" : "org.e599.model.Product#01-P01",
  "batchDate" : "2018-01-02T11:42Z",
  "expirationDate" : "2019-01-02T11:42Z",
  "manufactureLocation" : "org.e599.model.Location#01-L01"
}' 'http://localhost:3000/api/Batch'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "01-P02-B001",
  "product" : "org.e599.model.Product#01-P02",
  "batchdDate" : "2018-02-02T11:42Z",
  "expirationDate" : "2019-02-02T11:42Z",
  "manufactureLocation" : "org.e599.model.Location#01-L01"
}' 'http://localhost:3000/api/Batch'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class" : "org.e599.model.Batch",
  "batchId" : "01-P03-B001",
  "product" : "org.e599.model.Product#01-P03",
  "batchDate" : "2018-03-04T11:42Z",
  "expirationDate" : "2019-03-02T11:42Z",
  "manufactureLocation" : "org.e599.model.Location#01-L01"
}' 'http://localhost:3000/api/Batch'

# Add Items 
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Item",
  "GTIN": "01-P01-I001",
  "product": "org.e599.model.Product#01-P01",
  "unitCount" : 500,
  "unit" : "mg",
  "dosage" : 25
}' 'http://localhost:3000/api/Item'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Item",
  "GTIN": "01-P02-I001",
  "product": "org.e599.model.Product#01-P02",
  "unitCount" : 100,
  "unit" : "ml",
  "dosage" : 1
}' 'http://localhost:3000/api/Item'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.Item",
  "GTIN": "01-P03-I001",
  "product": "org.e599.model.Product#01-P03",
  "unitCount" : 200,
  "unit" : "mg",
  "dosage" : 10
}' 'http://localhost:3000/api/Item'

# Individual package
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P01-I001-S0001",
  "item": "org.e599.model.Item#01-P01-I001",
  "batch" : "org.e599.model.Batch#01-P01-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P01-I001-S0002",
  "item": "org.e599.model.Item#01-P01-I001",
  "batch" : "org.e599.model.Batch#01-P01-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P01-I001-S0003",
  "item": "org.e599.model.Item#01-P01-I001",
  "batch" : "org.e599.model.Batch#01-P01-B001"
}' 'http://localhost:3000/api/IndividualPackage'

###
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P02-I001-S0001",
  "item": "org.e599.model.Item#01-P02-I001",
  "batch" : "org.e599.model.Batch#01-P02-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P02-I001-S0002",
  "item": "org.e599.model.Item#01-P02-I001",
  "batch" : "org.e599.model.Batch#01-P02-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P02-I001-S0003",
  "item": "org.e599.model.Item#01-P02-I001",
  "batch" : "org.e599.model.Batch#01-P02-B001"
}' 'http://localhost:3000/api/IndividualPackage'

###
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P03-I001-S0001",
  "item": "org.e599.model.Item#01-P03-I001",
  "batch" : "org.e599.model.Batch#01-P03-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P03-I001-S0002",
  "item": "org.e599.model.Item#01-P03-I001",
  "batch" : "org.e599.model.Batch#01-P03-B001"
}' 'http://localhost:3000/api/IndividualPackage'

 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.IndividualPackage",
  "SGTIN" : "01-P03-I001-S0003",
  "item": "org.e599.model.Item#01-P03-I001",
  "batch" : "org.e599.model.Batch#01-P03-B001"
}' 'http://localhost:3000/api/IndividualPackage'

# Containers
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0001",
  "currentLocation": "org.e599.model.Location#01-L01",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0002",
  "currentLocation": "org.e599.model.Location#01-L01",
  "packages": []
}' 'http://localhost:3000/api/ShippingContainer'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "$class": "org.e599.model.ShippingContainer",
  "SSCC" : "SSCC-0003",
  "currentLocation": "org.e599.model.Location#01-L01",
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