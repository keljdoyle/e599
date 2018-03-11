import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IndividualPackageService } from './IndividualPackage.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-IndividualPackage',
	templateUrl: './IndividualPackage.component.html',
	styleUrls: ['./IndividualPackage.component.css'],
  providers: [IndividualPackageService]
})
export class IndividualPackageComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          SGTIN = new FormControl("", Validators.required);
        
  
      
          item = new FormControl("", Validators.required);
        
  
      
          batch = new FormControl("", Validators.required);
        
  
      
          currentLocation = new FormControl("", Validators.required);
        
  


  constructor(private serviceIndividualPackage:IndividualPackageService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          SGTIN:this.SGTIN,
        
    
        
          item:this.item,
        
    
        
          batch:this.batch,
        
    
        
          currentLocation:this.currentLocation
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceIndividualPackage.getAll()
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
      $class: "org.e599.model.IndividualPackage",
      
        
          "SGTIN":this.SGTIN.value,
        
      
        
          "item":this.item.value,
        
      
        
          "batch":this.batch.value,
        
      
        
          "currentLocation":this.currentLocation.value
        
      
    };

    this.myForm.setValue({
      
        
          "SGTIN":null,
        
      
        
          "item":null,
        
      
        
          "batch":null,
        
      
        
          "currentLocation":null
        
      
    });

    return this.serviceIndividualPackage.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "SGTIN":null,
        
      
        
          "item":null,
        
      
        
          "batch":null,
        
      
        
          "currentLocation":null 
        
      
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
      $class: "org.e599.model.IndividualPackage",
      
        
          
        
    
        
          
            "item":this.item.value,
          
        
    
        
          
            "batch":this.batch.value,
          
        
    
        
          
            "currentLocation":this.currentLocation.value
          
        
    
    };

    return this.serviceIndividualPackage.updateAsset(form.get("SGTIN").value,this.asset)
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

    return this.serviceIndividualPackage.deleteAsset(this.currentId)
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

    return this.serviceIndividualPackage.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "SGTIN":null,
          
        
          
            "item":null,
          
        
          
            "batch":null,
          
        
          
            "currentLocation":null 
          
        
      };



      
        if(result.SGTIN){
          
            formObject.SGTIN = result.SGTIN;
          
        }else{
          formObject.SGTIN = null;
        }
      
        if(result.item){
          
            formObject.item = result.item;
          
        }else{
          formObject.item = null;
        }
      
        if(result.batch){
          
            formObject.batch = result.batch;
          
        }else{
          formObject.batch = null;
        }
      
        if(result.currentLocation){
          
            formObject.currentLocation = result.currentLocation;
          
        }else{
          formObject.currentLocation = null;
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
      
        
          "SGTIN":null,
        
      
        
          "item":null,
        
      
        
          "batch":null,
        
      
        
          "currentLocation":null 
        
      
      });
  }

}
