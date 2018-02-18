import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocationService } from './Location.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Location',
	templateUrl: './Location.component.html',
	styleUrls: ['./Location.component.css'],
  providers: [LocationService]
})
export class LocationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          gln = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          company = new FormControl("", Validators.required);
        
  


  constructor(private serviceLocation:LocationService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          gln:this.gln,
        
    
        
          address:this.address,
        
    
        
          company:this.company
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLocation.getAll()
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
      $class: "org.e599.model.Location",
      
        
          "gln":this.gln.value,
        
      
        
          "address":this.address.value,
        
      
        
          "company":this.company.value
        
      
    };

    this.myForm.setValue({
      
        
          "gln":null,
        
      
        
          "address":null,
        
      
        
          "company":null
        
      
    });

    return this.serviceLocation.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "gln":null,
        
      
        
          "address":null,
        
      
        
          "company":null 
        
      
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
      $class: "org.e599.model.Location",
      
        
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "company":this.company.value
          
        
    
    };

    return this.serviceLocation.updateAsset(form.get("gln").value,this.asset)
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

    return this.serviceLocation.deleteAsset(this.currentId)
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

    return this.serviceLocation.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "gln":null,
          
        
          
            "address":null,
          
        
          
            "company":null 
          
        
      };



      
        if(result.gln){
          
            formObject.gln = result.gln;
          
        }else{
          formObject.gln = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.company){
          
            formObject.company = result.company;
          
        }else{
          formObject.company = null;
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
      
        
          "gln":null,
        
      
        
          "address":null,
        
      
        
          "company":null 
        
      
      });
  }

}
