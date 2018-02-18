import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContainerService } from './Container.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Container',
	templateUrl: './Container.component.html',
	styleUrls: ['./Container.component.css'],
  providers: [ContainerService]
})
export class ContainerComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          gtin = new FormControl("", Validators.required);
        
  
      
          currentLocation = new FormControl("", Validators.required);
        
  
      
          packages = new FormControl("", Validators.required);
        
  


  constructor(private serviceContainer:ContainerService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          gtin:this.gtin,
        
    
        
          currentLocation:this.currentLocation,
        
    
        
          packages:this.packages
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceContainer.getAll()
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
      $class: "org.e599.model.Container",
      
        
          "gtin":this.gtin.value,
        
      
        
          "currentLocation":this.currentLocation.value,
        
      
        
          "packages":this.packages.value
        
      
    };

    this.myForm.setValue({
      
        
          "gtin":null,
        
      
        
          "currentLocation":null,
        
      
        
          "packages":null
        
      
    });

    return this.serviceContainer.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "gtin":null,
        
      
        
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
      $class: "org.e599.model.Container",
      
        
          
        
    
        
          
            "currentLocation":this.currentLocation.value,
          
        
    
        
          
            "packages":this.packages.value
          
        
    
    };

    return this.serviceContainer.updateAsset(form.get("gtin").value,this.asset)
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

    return this.serviceContainer.deleteAsset(this.currentId)
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

    return this.serviceContainer.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "gtin":null,
          
        
          
            "currentLocation":null,
          
        
          
            "packages":null 
          
        
      };



      
        if(result.gtin){
          
            formObject.gtin = result.gtin;
          
        }else{
          formObject.gtin = null;
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
      
        
          "gtin":null,
        
      
        
          "currentLocation":null,
        
      
        
          "packages":null 
        
      
      });
  }

}
