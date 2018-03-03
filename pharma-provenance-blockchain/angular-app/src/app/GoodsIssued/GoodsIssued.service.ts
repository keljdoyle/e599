import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { GoodsIssued } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class GoodsIssuedService {

	
		private NAMESPACE: string = 'GoodsIssued';
	



    constructor(private dataService: DataService<GoodsIssued>) {
    };

    public getAll(): Observable<GoodsIssued[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<GoodsIssued> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<GoodsIssued> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<GoodsIssued> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<GoodsIssued> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
