import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShipmentService } from './Shipment.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Shipment',
	templateUrl: './Shipment.component.html',
	styleUrls: ['./Shipment.component.css'],
  providers: [ShipmentService]
})
export class ShipmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          sscc = new FormControl("", Validators.required);
        
  
      
          container = new FormControl("", Validators.required);
        
  
      
          sendFrom = new FormControl("", Validators.required);
        
  
      
          sendTo = new FormControl("", Validators.required);
        
  


  constructor(private serviceShipment:ShipmentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          sscc:this.sscc,
        
    
        
          container:this.container,
        
    
        
          sendFrom:this.sendFrom,
        
    
        
          sendTo:this.sendTo
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceShipment.getAll()
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
      $class: "org.e599.model.Shipment",
      
        
          "sscc":this.sscc.value,
        
      
        
          "container":this.container.value,
        
      
        
          "sendFrom":this.sendFrom.value,
        
      
        
          "sendTo":this.sendTo.value
        
      
    };

    this.myForm.setValue({
      
        
          "sscc":null,
        
      
        
          "container":null,
        
      
        
          "sendFrom":null,
        
      
        
          "sendTo":null
        
      
    });

    return this.serviceShipment.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "sscc":null,
        
      
        
          "container":null,
        
      
        
          "sendFrom":null,
        
      
        
          "sendTo":null 
        
      
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
      $class: "org.e599.model.Shipment",
      
        
          
        
    
        
          
            "container":this.container.value,
          
        
    
        
          
            "sendFrom":this.sendFrom.value,
          
        
    
        
          
            "sendTo":this.sendTo.value
          
        
    
    };

    return this.serviceShipment.updateAsset(form.get("sscc").value,this.asset)
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

    return this.serviceShipment.deleteAsset(this.currentId)
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

    return this.serviceShipment.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "sscc":null,
          
        
          
            "container":null,
          
        
          
            "sendFrom":null,
          
        
          
            "sendTo":null 
          
        
      };



      
        if(result.sscc){
          
            formObject.sscc = result.sscc;
          
        }else{
          formObject.sscc = null;
        }
      
        if(result.container){
          
            formObject.container = result.container;
          
        }else{
          formObject.container = null;
        }
      
        if(result.sendFrom){
          
            formObject.sendFrom = result.sendFrom;
          
        }else{
          formObject.sendFrom = null;
        }
      
        if(result.sendTo){
          
            formObject.sendTo = result.sendTo;
          
        }else{
          formObject.sendTo = null;
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
        
      
        
          "container":null,
        
      
        
          "sendFrom":null,
        
      
        
          "sendTo":null 
        
      
      });
  }

}
