import { Injectable } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, RequestOptions } from '@angular/http';
import { GlobalVariable } from '../../../global';

@Injectable()
export class CountryMasterService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/geographies/countries`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(): Promise<any> {
		return this.http.get(`${this.url}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(countries: any): Promise<any> {
		return this.http.post(this.url, countries, this.options).toPromise().then((response) => {
			return response.status;
		})
	}
	get(uid: number): Promise<any> {
		return this.http.get(`${this.url}/${uid}`).toPromise().then((response) => {
			return response.json();
		});
	}

	update(country: any): Promise<number> {
		return this.http.put(`${this.url}/${country.uid}`, country).toPromise().then((response) => {    
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}	
}
