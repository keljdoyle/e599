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
   export class Container extends Asset {
      gtin: string;
      currentLocation: Location;
      packages: IndividualPackage[];
   }
   export class IndividualPackage extends Asset {
      gtin: string;
      unitCount: number;
      dosage: number;
      unit: string;
      product: Product;
      batch: Batch;
   }
   export class Location extends Asset {
      gln: string;
      address: string;
      company: SupplyChainPartner;
   }
   export class Shipment extends Asset {
      sscc: string;
      container: Container;
      sendFrom: Location;
      sendTo: Location;
      shipper: SupplyChainPartner;
   }
   export class SupplyChainPartner extends Participant {
      partnerId: string;
      companyName: string;
   }
   export class GoodsIssued extends Asset {
      sscc: string;
      gtin: string;
      gln: string;
   }
   export class GoodsReceived extends Asset {
      sscc: string;
      gtin: string;
      gln: string;
   }
   export class DeliveryTransaction extends Transaction {
      shipment: Shipment;
   }
   export class PackageTransaction extends Transaction {
      container: Container;
      contents: IndividualPackage[];
   }
   export class ShipmentNotification extends Event {
      shipment: Shipment;
   }
// }
