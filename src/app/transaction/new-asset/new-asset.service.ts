import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { GlobalVariable } from '../../global';
import 'rxjs/add/operator/toPromise';

// remove later
import { CALLS } from '../../shared/mock-data/sample-calls';

@Injectable()
export class NewAssetService {
    url: string;
	private headers: Headers;
    private options: RequestOptions;
    
    constructor(private http: Http) {
		// this.url = `${GlobalVariable.BASE_API_URL}/transactions/new-assets/`;
		this.url = `${GlobalVariable.BASE_API_URL}/transactions/calls/`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
    }
    
    all(date:any): Promise<any> {
		return this.http.get(`${this.url}/${date.from}/${date.to}/${date.status}`).toPromise().then((response) => {
			return response.json();
		});
	}
}