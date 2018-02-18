import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LocationService {

	
		private NAMESPACE: string = 'Location';
	



    constructor(private dataService: DataService<Location>) {
    };

    public getAll(): Observable<Location[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Location> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Location> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Location> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Location> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
