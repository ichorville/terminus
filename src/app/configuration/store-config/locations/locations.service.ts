import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { GlobalVariable } from '../../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreLocationsService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {    
		this.url = `${GlobalVariable.BASE_API_URL}/configuration/store/locations`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(): Promise<any[]> {
		return this.http.get(`${this.url}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(storeLocation: any): Promise<any> {
		return this.http.post(this.url, storeLocation, this.options).toPromise().then((response) => {
			return response;
		});
	}

	get(uid: number): Promise<any> {
		return this.http.get(`${this.url}/${uid}`).toPromise().then((response) => {
			return response.json();
		});
	}

	update(storeLocation: any): Promise<number> {
		return this.http.put(`${this.url}/${storeLocation.uid}`, storeLocation).toPromise().then((response) => {
			return response.status;
		});
	}	
}
