import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './configuration';
import { VisibilityRecord } from './org.e599.model';

@Injectable()
export class TransactionService {
    private resolveSuffix: string = '?resolve=true';
    private shipTransactionUrl: string;
    private ssccActionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private _configuration: Configuration) {
        this.shipTransactionUrl = "http://localhost:3000/api/ShipTransaction";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }


    public submitShipTransaction(sgtin: string): Observable<VisibilityRecord[]> {
        console.log('Retrieving VisibilityRecords by SGTIN: ' + this.shipTransactionUrl);
        return this.http.post(`${this.shipTransactionUrl}`, '')
          .map(this.extractData)
          .catch(this.handleError);
    }



    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }

}
