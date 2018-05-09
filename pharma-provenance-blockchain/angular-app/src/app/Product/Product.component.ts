import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Product',
	templateUrl: './Product.component.html',
	styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

          productId = new FormControl("", Validators.required);
          productName = new FormControl("", Validators.required);
          manufacturer = new FormControl("", Validators.required);
        
  constructor(private serviceProduct:ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
          productId:this.productId,
          productName:this.productName,
          manufacturer:this.manufacturer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProduct.getAll()
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
      $class: "org.e599.model.Product",
          "productId":this.productId.value,
          "productName":this.productName.value,
          "manufacturer":this.manufacturer.value
    };

    this.myForm.setValue({
          "productId":null,
          "productName":null,
          "manufacturer":null
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "productId":null,
          "productName":null,
          "manufacturer":null
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
      $class: "org.e599.model.Product",
      
        
          
        
    
        
          
            "productName":this.productName.value,
          
        
    
        
          
            "manufacturer":this.manufacturer.value
          
        
    
    };

    return this.serviceProduct.updateAsset(form.get("productId").value,this.asset)
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

    return this.serviceProduct.deleteAsset(this.currentId)
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

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productId":null,
          
        
          
            "productName":null,
          
        
          
            "manufacturer":null 
          
        
      };



      
        if(result.productId){
          
            formObject.productId = result.productId;
          
        }else{
          formObject.productId = null;
        }
      
        if(result.productName){
          
            formObject.productName = result.productName;
          
        }else{
          formObject.productName = null;
        }
      
        if(result.manufacturer){
          
            formObject.manufacturer = result.manufacturer;
          
        }else{
          formObject.manufacturer = null;
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
      
        
          "productId":null,
        
      
        
          "productName":null,
        
      
        
          "manufacturer":null 
        
      
      });
  }

}
