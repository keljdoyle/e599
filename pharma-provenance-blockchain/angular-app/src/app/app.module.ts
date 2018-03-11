import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { BatchComponent } from './Batch/Batch.component';
import { ProductComponent } from './Product/Product.component';
import { ItemComponent } from './Item/Item.component';
import { ShippingContainerComponent } from './ShippingContainer/ShippingContainer.component';
import { IndividualPackageComponent } from './IndividualPackage/IndividualPackage.component';
import { LocationComponent } from './Location/Location.component';
import { VisibilityRecordComponent } from './VisibilityRecord/VisibilityRecord.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    BatchComponent,
		ProductComponent,
		ItemComponent,
		ShippingContainerComponent,
		IndividualPackageComponent,
		LocationComponent,
		
    VisibilityRecordComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
