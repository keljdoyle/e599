import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ProductComponent } from './Product/Product.component';
import { ContainerComponent } from './Container/Container.component';
import { IndividualPackageComponent } from './IndividualPackage/IndividualPackage.component';
import { LocationComponent } from './Location/Location.component';
import { ShipmentComponent } from './Shipment/Shipment.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Product', component: ProductComponent},
		
		{ path: 'Container', component: ContainerComponent},
		
		{ path: 'IndividualPackage', component: IndividualPackageComponent},
		
		{ path: 'Location', component: LocationComponent},
		
		{ path: 'Shipment', component: ShipmentComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
