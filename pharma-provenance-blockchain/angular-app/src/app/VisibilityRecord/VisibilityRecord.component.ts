import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VisibilityRecordService } from './VisibilityRecord.service';
import { QueryService } from '../Query.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-VisibilityRecord',
	templateUrl: './VisibilityRecord.component.html',
	styleUrls: ['./VisibilityRecord.component.css'],
  providers: [VisibilityRecordService, QueryService]
})
export class VisibilityRecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

          transactionId = new FormControl("", Validators.required);
          SSCC = new FormControl("", Validators.required);
          GTIN = new FormControl("", Validators.required);
          GLN = new FormControl("", Validators.required);
          SGTINs = new FormControl("", Validators.required);
          eventType = new FormControl("", Validators.required);
          businessStep = new FormControl("", Validators.required);
          action = new FormControl("", Validators.required);
          disposition = new FormControl("", Validators.required);
          locationText = new FormControl("", Validators.required);
          eventTime = new FormControl("", Validators.required);
        
  constructor(
    private serviceVisibilityRecord:VisibilityRecordService,
    private queryService:QueryService,
    fb: FormBuilder) {
    this.myForm = fb.group({
          transactionId:this.transactionId,
          SSCC:this.SSCC,
          GTIN:this.GTIN,
          GLN:this.GLN,
          SGTINs:this.SGTINs,
          eventType:this.eventType,
          businessStep:this.businessStep,
          action:this.action,
          disposition:this.disposition,
          locationText:this.locationText,
          eventTime:this.eventTime
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadBySgtin(): Promise<any> {
    let tempList = [];
    return this.queryService.getBySgtin('GTIN-0001-0001')
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

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVisibilityRecord.getAll()
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
      $class: "org.e599.model.VisibilityRecord",
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "SSCC":this.SSCC.value,
        
      
        
          "GTIN":this.GTIN.value,
        
      
        
          "GLN":this.GLN.value,
        
      
        
          "SGTINs":this.SGTINs.value,
        
      
        
          "eventType":this.eventType.value,
        
      
        
          "businessStep":this.businessStep.value,
        
      
        
          "action":this.action.value,
        
      
        
          "disposition":this.disposition.value,
        
      
        
          "locationText":this.locationText.value,
        
      
        
          "eventTime":this.eventTime.value
        
      
    };

    this.myForm.setValue({
      
        
          "transactionId":null,
        
      
        
          "SSCC":null,
        
      
        
          "GTIN":null,
        
      
        
          "GLN":null,
        
      
        
          "SGTINs":null,
        
      
        
          "eventType":null,
        
      
        
          "businessStep":null,
        
      
        
          "action":null,
        
      
        
          "disposition":null,
        
      
        
          "locationText":null,
        
      
        
          "eventTime":null
        
      
    });

    return this.serviceVisibilityRecord.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "transactionId":null,
        
      
        
          "SSCC":null,
        
      
        
          "GTIN":null,
        
      
        
          "GLN":null,
        
      
        
          "SGTINs":null,
        
      
        
          "eventType":null,
        
      
        
          "businessStep":null,
        
      
        
          "action":null,
        
      
        
          "disposition":null,
        
      
        
          "locationText":null,
        
      
        
          "eventTime":null 
        
      
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
      $class: "org.e599.model.VisibilityRecord",
      
        
          
        
    
        
          
            "SSCC":this.SSCC.value,
          
        
    
        
          
            "GTIN":this.GTIN.value,
          
        
    
        
          
            "GLN":this.GLN.value,
          
        
    
        
          
            "SGTINs":this.SGTINs.value,
          
        
    
        
          
            "eventType":this.eventType.value,
          
        
    
        
          
            "businessStep":this.businessStep.value,
          
        
    
        
          
            "action":this.action.value,
          
        
    
        
          
            "disposition":this.disposition.value,
          
        
    
        
          
            "locationText":this.locationText.value,
          
        
    
        
          
            "eventTime":this.eventTime.value
          
        
    
    };

    return this.serviceVisibilityRecord.updateAsset(form.get("transactionId").value,this.asset)
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

    return this.serviceVisibilityRecord.deleteAsset(this.currentId)
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

    return this.serviceVisibilityRecord.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "transactionId":null,
          
        
          
            "SSCC":null,
          
        
          
            "GTIN":null,
          
        
          
            "GLN":null,
          
        
          
            "SGTINs":null,
          
        
          
            "eventType":null,
          
        
          
            "businessStep":null,
          
        
          
            "action":null,
          
        
          
            "disposition":null,
          
        
          
            "locationText":null,
          
        
          
            "eventTime":null 
          
        
      };



      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
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
      
        if(result.GLN){
          
            formObject.GLN = result.GLN;
          
        }else{
          formObject.GLN = null;
        }
      
        if(result.SGTINs){
          
            formObject.SGTINs = result.SGTINs;
          
        }else{
          formObject.SGTINs = null;
        }
      
        if(result.eventType){
          
            formObject.eventType = result.eventType;
          
        }else{
          formObject.eventType = null;
        }
      
        if(result.businessStep){
          
            formObject.businessStep = result.businessStep;
          
        }else{
          formObject.businessStep = null;
        }
      
        if(result.action){
          
            formObject.action = result.action;
          
        }else{
          formObject.action = null;
        }
      
        if(result.disposition){
          
            formObject.disposition = result.disposition;
          
        }else{
          formObject.disposition = null;
        }
      
        if(result.locationText){
          
            formObject.locationText = result.locationText;
          
        }else{
          formObject.locationText = null;
        }
      
        if(result.eventTime){
          
            formObject.eventTime = result.eventTime;
          
        }else{
          formObject.eventTime = null;
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
      
        
          "transactionId":null,
        
      
        
          "SSCC":null,
        
      
        
          "GTIN":null,
        
      
        
          "GLN":null,
        
      
        
          "SGTINs":null,
        
      
        
          "eventType":null,
        
      
        
          "businessStep":null,
        
      
        
          "action":null,
        
      
        
          "disposition":null,
        
      
        
          "locationText":null,
        
      
        
          "eventTime":null 
        
      
      });
  }

}
