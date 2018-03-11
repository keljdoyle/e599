import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { VisibilityRecord } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VisibilityRecordService {

	
		private NAMESPACE: string = 'VisibilityRecord';
	



    constructor(private dataService: DataService<VisibilityRecord>) {
    };

    public getAll(): Observable<VisibilityRecord[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<VisibilityRecord> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<VisibilityRecord> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<VisibilityRecord> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<VisibilityRecord> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
