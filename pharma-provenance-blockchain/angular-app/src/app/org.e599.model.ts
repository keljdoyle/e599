import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.e599.model{
   export class Batch extends Asset {
      batchId: string;
      batchDate: Date;
      expirationDate: Date;
      manufactureLocation: Location;
      product: Product;
   }
   export class Product extends Asset {
      productId: string;
      productName: string;
      manufacturer: SupplyChainPartner;
   }
   export class Item extends Asset {
      GTIN: string;
      unitCount: number;
      dosage: number;
      unit: string;
      product: Product;
   }
   export class ShippingContainer extends Asset {
      SSCC: string;
      GTIN: string;
      currentLocation: Location;
      packages: IndividualPackage[];
      product: Product;
   }
   export class IndividualPackage extends Asset {
      SGTIN: string;
      item: Item;
      batch: Batch;
      currentLocation: Location;
   }
   export class Location extends Asset {
      GLN: string;
      address: string;
      company: SupplyChainPartner;
   }
   export class SupplyChainPartner extends Participant {
      partnerId: string;
      companyName: string;
   }
   export class VisibilityRecord extends Asset {
      transactionId: string;
      SSCC: string;
      GTIN: string;
      GLN: string;
      SGTINs: string[];
      eventType: string;
      businessStep: string;
      action: string;
      disposition: string;
      locationText: string;
      eventTime: Date;
      productText: string;
      itemText: string;
   }
   
   export class ShipTransaction extends Transaction {
      container: ShippingContainer;
      readPoint: Location;
   }
   export class ReceiveTransaction extends Transaction {
      container: ShippingContainer;
      readPoint: Location;
   }
   export class PackageTransaction extends Transaction {
      container: ShippingContainer;
      contents: IndividualPackage[];
      readPoint: Location;
   }
   export class VisibilityEvent extends Event {
      record: VisibilityRecord;
   }
// }
