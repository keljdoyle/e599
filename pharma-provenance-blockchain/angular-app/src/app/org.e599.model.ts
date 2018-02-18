import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.e599.model{
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
      product: Product;
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
   }
   export class SupplyChainPartner extends Participant {
      partnerId: string;
      companyName: string;
   }
   export class Shipper extends Participant {
      shipperId: string;
      companyName: string;
   }
   export class Delivery extends Transaction {
      shipment: Shipment;
   }
   export class ShipmentNotification extends Event {
      shipment: Shipment;
   }
// }
