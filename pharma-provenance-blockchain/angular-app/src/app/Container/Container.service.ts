import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Container } from '../org.e599.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ContainerService {

	
		private NAMESPACE: string = 'Container';
	



    constructor(private dataService: DataService<Container>) {
    };

    public getAll(): Observable<Container[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Container> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Container> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Container> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Container> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
