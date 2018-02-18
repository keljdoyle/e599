import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { IndividualPackage } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class IndividualPackageService {

	
		private NAMESPACE: string = 'IndividualPackage';
	



    constructor(private dataService: DataService<IndividualPackage>) {
    };

    public getAll(): Observable<IndividualPackage[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<IndividualPackage> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<IndividualPackage> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<IndividualPackage> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<IndividualPackage> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
