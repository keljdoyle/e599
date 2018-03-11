import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShippingContainerService } from './ShippingContainer.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ShippingContainer',
	templateUrl: './ShippingContainer.component.html',
	styleUrls: ['./ShippingContainer.component.css'],
  providers: [ShippingContainerService]
})
export class ShippingContainerComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          SSCC = new FormControl("", Validators.required);
        
  
      
          GTIN = new FormControl("", Validators.required);
        
  
      
          currentLocation = new FormControl("", Validators.required);
        
  
      
          packages = new FormControl("", Validators.required);
        
  
      
          product = new FormControl("", Validators.required);
        
  


  constructor(private serviceShippingContainer:ShippingContainerService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          SSCC:this.SSCC,
        
    
        
          GTIN:this.GTIN,
        
    
        
          currentLocation:this.currentLocation,
        
    
        
          packages:this.packages,
        
    
        
          product:this.product
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceShippingContainer.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
        
      
        
          "GTIN":this.GTIN.value,
        
      
        
          "currentLocation":this.currentLocation.value,
        
      
        
          "packages":this.packages.value,
        
      
        
          "product":this.product.value
        
      
    };

    this.myForm.setValue({
      
        
          "SSCC":null,
        
      
        
          "GTIN":null,
        
      
        
          "currentLocation":null,
        
      
        
          "packages":null,
        
      
        
          "product":null
        
      
    });

    return this.serviceShippingContainer.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "SSCC":null,
        
      
        
          "GTIN":null,
        
      
        
          "currentLocation":null,
        
      
        
          "packages":null,
        
      
        
          "product":null 
        
      
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
      
        
          
        
    
        
          
            "GTIN":this.GTIN.value,
          
        
    
        
          
            "currentLocation":this.currentLocation.value,
          
        
    
        
          
            "packages":this.packages.value,
          
        
    
        
          
            "product":this.product.value
          
        
    
    };

    return this.serviceShippingContainer.updateAsset(form.get("SSCC").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceShippingContainer.deleteAsset(this.currentId)
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
          
        
          
            "GTIN":null,
          
        
          
            "currentLocation":null,
          
        
          
            "packages":null,
          
        
          
            "product":null 
          
        
      };



      
        if(result.SSCC){
          
            formObject.SSCC = result.SSCC;
          
        }else{
          formObject.SSCC = null;
        }
      
        if(result.GTIN){
          
            formObject.GTIN = result.GTIN;
          
        }else{
          formObject.GTIN = null;
        }
      
        if(result.currentLocation){
          
            formObject.currentLocation = result.currentLocation;
          
        }else{
          formObject.currentLocation = null;
        }
      
        if(result.packages){
          
            formObject.packages = result.packages;
          
        }else{
          formObject.packages = null;
        }
      
        if(result.product){
          
            formObject.product = result.product;
          
        }else{
          formObject.product = null;
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
        
      
        
          "GTIN":null,
        
      
        
          "currentLocation":null,
        
      
        
          "packages":null,
        
      
        
          "product":null 
        
      
      });
  }

}
