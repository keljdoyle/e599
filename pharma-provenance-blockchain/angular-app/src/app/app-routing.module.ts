import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { BatchComponent } from './Batch/Batch.component';
import { ProductComponent } from './Product/Product.component';
import { ItemComponent } from './Item/Item.component';
import { ShippingContainerComponent } from './ShippingContainer/ShippingContainer.component';
import { IndividualPackageComponent } from './IndividualPackage/IndividualPackage.component';
import { LocationComponent } from './Location/Location.component';
import { VisibilityRecordComponent } from './VisibilityRecord/VisibilityRecord.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Batch', component: BatchComponent},
		
		{ path: 'Product', component: ProductComponent},
		
		{ path: 'Item', component: ItemComponent},
		
		{ path: 'ShippingContainer', component: ShippingContainerComponent},
		
		{ path: 'IndividualPackage', component: IndividualPackageComponent},
		
		{ path: 'Location', component: LocationComponent},
		
		{ path: 'VisibilityRecord', component: VisibilityRecordComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
