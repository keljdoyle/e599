import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { BatchComponent } from './Batch/Batch.component';
import { ProductComponent } from './Product/Product.component';
import { ContainerComponent } from './Container/Container.component';
import { IndividualPackageComponent } from './IndividualPackage/IndividualPackage.component';
import { LocationComponent } from './Location/Location.component';
import { ShipmentComponent } from './Shipment/Shipment.component';
import { GoodsIssuedComponent } from './GoodsIssued/GoodsIssued.component';
import { GoodsReceivedComponent } from './GoodsReceived/GoodsReceived.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Batch', component: BatchComponent},
		
		{ path: 'Product', component: ProductComponent},
		
		{ path: 'Container', component: ContainerComponent},
		
		{ path: 'IndividualPackage', component: IndividualPackageComponent},
		
		{ path: 'Location', component: LocationComponent},
		
		{ path: 'Shipment', component: ShipmentComponent},
		
		{ path: 'GoodsIssued', component: GoodsIssuedComponent},
		
		{ path: 'GoodsReceived', component: GoodsReceivedComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
