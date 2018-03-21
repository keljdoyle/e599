import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VisibilityRecordService } from './VisibilityRecord.service';
import { QueryService } from '../Query.service';
import { IndividualPackageService } from '../IndividualPackage/IndividualPackage.service';
import { ItemService } from '../Item/Item.service';
import { ProductService } from '../Product/Product.service';
import { BatchService } from '../Batch/Batch.service';
import { LocationService } from '../Location/Location.service';
import { DataService } from '../data.service';
import { SupplyChainPartner } from '../org.e599.model';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-VisibilityRecord',
	templateUrl: './VisibilityRecord.component.html',
	styleUrls: ['./VisibilityRecord.component.css'],
  providers: [
    VisibilityRecordService, 
    QueryService, 
    IndividualPackageService,
    ItemService,
    ProductService,
    BatchService,
    LocationService,
    DataService
  ]
})
export class VisibilityRecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private currentAsset;

  private sgtinSearch: string = '';
  private package;
  private item;
  private product;
  private batch;
  private batchLocation;
  private loaded = false;
  private manufacturer;

  searchBy: string = 'SGTIN';

  constructor(
    private serviceVisibilityRecord:VisibilityRecordService,
    private queryService:QueryService,
    private packageService:IndividualPackageService,
    private itemService:ItemService,
    private productService:ProductService,
    private batchService:BatchService,
    private locationService:LocationService,
    private partnerService:DataService<SupplyChainPartner>,
    fb: FormBuilder) {
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadPartner(id: string): Promise<any> {
    return this.partnerService.getSingle('SupplyChainPartner', id)
    .toPromise()
    .then((result) => {
      this.manufacturer = result;
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  loadLocation(id: string): Promise<any> {
    return this.locationService.getAsset(id)
    .toPromise()
    .then((result) => {
      this.batchLocation = result;
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  loadProductInfo(product: string): Promise<any> {
    return this.productService.getAsset(product)
    .toPromise()
    .then((result) => {
      this.product = result;
      this.loadPartner(result.manufacturer.toString().split('#')[1]);
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  loadBatchInfo(batchId: string): Promise<any> {
    return this.batchService.getAsset(batchId)
    .toPromise()
    .then((result) => {
      this.batch = result;
      this.loadLocation(result.manufactureLocation.toString().split('#')[1]);
    })
    .catch((error) => {
      this.serverError(error);
    });
  }


  loadItemInfo(item: string): Promise<any> {
    return this.itemService.getAsset(item)
    .toPromise()
    .then((result) => {
      this.item = result;
      this.loadProductInfo(result.product.toString().split('#')[1]);
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  loadPackageInfo(sgtin: string): Promise<any> {
    return this.packageService.getAsset(sgtin)
    .toPromise()
    .then((result) => {
      this.package = result;
      this.loadItemInfo(result.item.toString().split('#')[1]);
      this.loadBatchInfo(result.batch.toString().split('#')[1]);
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  itemText(): string {
    if (!this.item || !this.product) {
      return '';
    }
    return this.item.dosage.toString() + 
      this.item.unit + 
      " (" + this.item.unitCount + ")";
  }

  reset() {
    this.loaded = false;
    this.package = null;
    this.batch = null;
    this.item = null;
  }

  loadBySgtin(): Promise<any> {
    let tempList = [];
    this.reset();

    if (!this.sgtinSearch) {
      return;
    }

    return this.loadPackageInfo(this.sgtinSearch)
    .then(()=>
      this.queryService.getRecords(this.sgtinSearch, this.searchBy)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        tempList.sort(this.compareEvent);
        this.allAssets = tempList;
        this.loaded = true;
      })
      .catch((error) => {
        this.serverError(error);
      })
  );
  }

  compareEvent(a, b): number {
    if (a.eventTime > b.eventTime) {
      return 1;
    } 
    return -1;
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVisibilityRecord.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      tempList.sort(this.compareEvent);
      this.allAssets = tempList;
    })
    .catch((error) => {
        this.serverError(error);
    });
  }



	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceVisibilityRecord.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      
      this.currentAsset = result;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  serverError(error): void {
    if(error == 'Server error'){
      this.errorMessage = "Could not connect to REST server. Please check your configuration details";
    }
    else if(error == '404 - Not Found'){
    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
    }
    else{
        this.errorMessage = error;
    }
  }

}
