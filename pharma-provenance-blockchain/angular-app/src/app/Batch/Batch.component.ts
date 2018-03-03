import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BatchService } from './Batch.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Batch',
	templateUrl: './Batch.component.html',
	styleUrls: ['./Batch.component.css'],
  providers: [BatchService]
})
export class BatchComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          batchId = new FormControl("", Validators.required);
        
  
      
          batchDate = new FormControl("", Validators.required);
        
  
      
          expirationDate = new FormControl("", Validators.required);
        
  
      
          manufactureLocation = new FormControl("", Validators.required);
        
  
      
          product = new FormControl("", Validators.required);
        
  


  constructor(private serviceBatch:BatchService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          batchId:this.batchId,
        
    
        
          batchDate:this.batchDate,
        
    
        
          expirationDate:this.expirationDate,
        
    
        
          manufactureLocation:this.manufactureLocation,
        
    
        
          product:this.product
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceBatch.getAll()
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
      $class: "org.e599.model.Batch",
      
        
          "batchId":this.batchId.value,
        
      
        
          "batchDate":this.batchDate.value,
        
      
        
          "expirationDate":this.expirationDate.value,
        
      
        
          "manufactureLocation":this.manufactureLocation.value,
        
      
        
          "product":this.product.value
        
      
    };

    this.myForm.setValue({
      
        
          "batchId":null,
        
      
        
          "batchDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "manufactureLocation":null,
        
      
        
          "product":null
        
      
    });

    return this.serviceBatch.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "batchId":null,
        
      
        
          "batchDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "manufactureLocation":null,
        
      
        
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
      $class: "org.e599.model.Batch",
      
        
          
        
    
        
          
            "batchDate":this.batchDate.value,
          
        
    
        
          
            "expirationDate":this.expirationDate.value,
          
        
    
        
          
            "manufactureLocation":this.manufactureLocation.value,
          
        
    
        
          
            "product":this.product.value
          
        
    
    };

    return this.serviceBatch.updateAsset(form.get("batchId").value,this.asset)
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

    return this.serviceBatch.deleteAsset(this.currentId)
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

    return this.serviceBatch.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "batchId":null,
          
        
          
            "batchDate":null,
          
        
          
            "expirationDate":null,
          
        
          
            "manufactureLocation":null,
          
        
          
            "product":null 
          
        
      };



      
        if(result.batchId){
          
            formObject.batchId = result.batchId;
          
        }else{
          formObject.batchId = null;
        }
      
        if(result.batchDate){
          
            formObject.batchDate = result.batchDate;
          
        }else{
          formObject.batchDate = null;
        }
      
        if(result.expirationDate){
          
            formObject.expirationDate = result.expirationDate;
          
        }else{
          formObject.expirationDate = null;
        }
      
        if(result.manufactureLocation){
          
            formObject.manufactureLocation = result.manufactureLocation;
          
        }else{
          formObject.manufactureLocation = null;
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
      
        
          "batchId":null,
        
      
        
          "batchDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "manufactureLocation":null,
        
      
        
          "product":null 
        
      
      });
  }

}
