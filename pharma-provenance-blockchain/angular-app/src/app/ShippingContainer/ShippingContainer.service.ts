import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ShippingContainer } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShippingContainerService {

	
		private NAMESPACE: string = 'ShippingContainer';
	



    constructor(private dataService: DataService<ShippingContainer>) {
    };

    public getAll(): Observable<ShippingContainer[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ShippingContainer> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ShippingContainer> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ShippingContainer> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ShippingContainer> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
