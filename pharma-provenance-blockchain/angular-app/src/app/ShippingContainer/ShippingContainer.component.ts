import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShippingContainerService } from './ShippingContainer.service';
import { LocationService } from '../Location/Location.service';

import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ShippingContainer',
	templateUrl: './ShippingContainer.component.html',
	styleUrls: ['./ShippingContainer.component.css'],
  providers: [ShippingContainerService, LocationService]
})
export class ShippingContainerComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private locations;
  private selectedLocation;

  SSCC = new FormControl("", Validators.required);
  currentLocation = new FormControl("", Validators.required);
  packages = new FormControl("", Validators.required);
  packagesText: string = '';
        
  constructor(
    private serviceShippingContainer:ShippingContainerService, 
    private serviceLocation:LocationService, 
    fb: FormBuilder
  ) {
    this.myForm = fb.group({
          SSCC:this.SSCC,
          currentLocation:this.currentLocation,
          packages:this.packages,
          packagesText:null
    });
  };

  ngOnInit(): void {
    this.loadLocations().then((results) => {
			this.loadAll();
    })
  }

  loadLocations(): Promise<any> {
    return this.serviceLocation.getAll()
    .toPromise()
    .then((results) => {
			this.locations = results;
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  loadAll(): Promise<any> {
    let tempList = [];

    this.loadLocations();

    return this.serviceShippingContainer.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        this.locations.forEach(function(element) {
          console.log(element);
          if (asset.currentLocation.toString().split("#")[1] === element.GLN) {
            asset.locationText = element.GLN + " (" + element.address + ")";
          }
        });

        asset.packagesText = this.setPackagesText(asset.packages);

        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      this.serverError(error);
    });
  }

  setPackagesText(packages): string {
    var packagesText = '';

    packages.forEach(function(element) {
      if (packagesText !== '') {
        packagesText = packagesText + ",";
      }
      packagesText = packagesText + element.toString().split("#")[1];
    });
    return packagesText;
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

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.e599.model.ShippingContainer",
          "SSCC":this.SSCC.value,
          "currentLocation":this.currentLocation.value,
          "packages":this.packages.value
    };

    this.myForm.setValue({
          "SSCC":null,
          "currentLocation":null,
          "packages":null
    });

    return this.serviceShippingContainer.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "SSCC":null,
          "currentLocation":null,
          "packages":null
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.e599.model.ShippingContainer",
            "currentLocation":this.currentLocation.value,
            "packages":this.packages.value,
            "packagesText": this.setPackagesText(this.packages)
      };

    return this.serviceShippingContainer.updateAsset(form.get("SSCC").value, this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceShippingContainer.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "SSCC":null,
            "currentLocation":null,
            "packagesText":null,
            "packages": null
      };

        if(result.SSCC){
            formObject.SSCC = result.SSCC;
        }else{
          formObject.SSCC = null;
        }
      
        if(result.currentLocation){
            formObject.currentLocation = result.currentLocation;
        }else{
          formObject.currentLocation = null;
        }
      
        if(result.packages){
            formObject.packagesText = this.setPackagesText(result.packages);
        }else{
          formObject.packagesText = null;
        }
      
      this.myForm.setValue(formObject);
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

  resetForm(): void{
    this.myForm.setValue({
          "SSCC":null,
          "currentLocation":null,
          "packages":null
      });
  }

}
