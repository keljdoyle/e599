import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { GoodsReceived } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class GoodsReceivedService {

	
		private NAMESPACE: string = 'GoodsReceived';
	



    constructor(private dataService: DataService<GoodsReceived>) {
    };

    public getAll(): Observable<GoodsReceived[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<GoodsReceived> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<GoodsReceived> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<GoodsReceived> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<GoodsReceived> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
