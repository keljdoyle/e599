import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ItemService } from './Item.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Item',
	templateUrl: './Item.component.html',
	styleUrls: ['./Item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          GTIN = new FormControl("", Validators.required);
        
  
      
          unitCount = new FormControl("", Validators.required);
        
  
      
          dosage = new FormControl("", Validators.required);
        
  
      
          unit = new FormControl("", Validators.required);
        
  
      
          product = new FormControl("", Validators.required);
        
  


  constructor(private serviceItem:ItemService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          GTIN:this.GTIN,
        
    
        
          unitCount:this.unitCount,
        
    
        
          dosage:this.dosage,
        
    
        
          unit:this.unit,
        
    
        
          product:this.product
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceItem.getAll()
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
      $class: "org.e599.model.Item",
      
        
          "GTIN":this.GTIN.value,
        
      
        
          "unitCount":this.unitCount.value,
        
      
        
          "dosage":this.dosage.value,
        
      
        
          "unit":this.unit.value,
        
      
        
          "product":this.product.value
        
      
    };

    this.myForm.setValue({
      
        
          "GTIN":null,
        
      
        
          "unitCount":null,
        
      
        
          "dosage":null,
        
      
        
          "unit":null,
        
      
        
          "product":null
        
      
    });

    return this.serviceItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "GTIN":null,
        
      
        
          "unitCount":null,
        
      
        
          "dosage":null,
        
      
        
          "unit":null,
        
      
        
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
      $class: "org.e599.model.Item",
      
        
          
        
    
        
          
            "unitCount":this.unitCount.value,
          
        
    
        
          
            "dosage":this.dosage.value,
          
        
    
        
          
            "unit":this.unit.value,
          
        
    
        
          
            "product":this.product.value
          
        
    
    };

    return this.serviceItem.updateAsset(form.get("GTIN").value,this.asset)
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

    return this.serviceItem.deleteAsset(this.currentId)
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

    return this.serviceItem.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "GTIN":null,
          
        
          
            "unitCount":null,
          
        
          
            "dosage":null,
          
        
          
            "unit":null,
          
        
          
            "product":null 
          
        
      };



      
        if(result.GTIN){
          
            formObject.GTIN = result.GTIN;
          
        }else{
          formObject.GTIN = null;
        }
      
        if(result.unitCount){
          
            formObject.unitCount = result.unitCount;
          
        }else{
          formObject.unitCount = null;
        }
      
        if(result.dosage){
          
            formObject.dosage = result.dosage;
          
        }else{
          formObject.dosage = null;
        }
      
        if(result.unit){
          
            formObject.unit = result.unit;
          
        }else{
          formObject.unit = null;
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
      
        
          "GTIN":null,
        
      
        
          "unitCount":null,
        
      
        
          "dosage":null,
        
      
        
          "unit":null,
        
      
        
          "product":null 
        
      
      });
  }

}
