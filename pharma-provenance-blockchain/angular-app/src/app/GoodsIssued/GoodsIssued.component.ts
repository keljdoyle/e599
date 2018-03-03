import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GoodsIssuedService } from './GoodsIssued.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-GoodsIssued',
	templateUrl: './GoodsIssued.component.html',
	styleUrls: ['./GoodsIssued.component.css'],
  providers: [GoodsIssuedService]
})
export class GoodsIssuedComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          sscc = new FormControl("", Validators.required);
        
  
      
          gtin = new FormControl("", Validators.required);
        
  
      
          gln = new FormControl("", Validators.required);
        
  


  constructor(private serviceGoodsIssued:GoodsIssuedService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          sscc:this.sscc,
        
    
        
          gtin:this.gtin,
        
    
        
          gln:this.gln
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceGoodsIssued.getAll()
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
      $class: "org.e599.model.GoodsIssued",
      
        
          "sscc":this.sscc.value,
        
      
        
          "gtin":this.gtin.value,
        
      
        
          "gln":this.gln.value
        
      
    };

    this.myForm.setValue({
      
        
          "sscc":null,
        
      
        
          "gtin":null,
        
      
        
          "gln":null
        
      
    });

    return this.serviceGoodsIssued.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "sscc":null,
        
      
        
          "gtin":null,
        
      
        
          "gln":null 
        
      
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
      $class: "org.e599.model.GoodsIssued",
      
        
          
        
    
        
          
            "gtin":this.gtin.value,
          
        
    
        
          
            "gln":this.gln.value
          
        
    
    };

    return this.serviceGoodsIssued.updateAsset(form.get("sscc").value,this.asset)
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

    return this.serviceGoodsIssued.deleteAsset(this.currentId)
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

    return this.serviceGoodsIssued.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "sscc":null,
          
        
          
            "gtin":null,
          
        
          
            "gln":null 
          
        
      };



      
        if(result.sscc){
          
            formObject.sscc = result.sscc;
          
        }else{
          formObject.sscc = null;
        }
      
        if(result.gtin){
          
            formObject.gtin = result.gtin;
          
        }else{
          formObject.gtin = null;
        }
      
        if(result.gln){
          
            formObject.gln = result.gln;
          
        }else{
          formObject.gln = null;
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
      
        
          "sscc":null,
        
      
        
          "gtin":null,
        
      
        
          "gln":null 
        
      
      });
  }

}
