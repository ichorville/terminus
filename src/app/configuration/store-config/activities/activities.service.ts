import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreActivitiesService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/configuration/store/activities`;
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

	create(storeActivity: any): Promise<any> {
		return this.http.post(this.url, storeActivity, this.options).toPromise().then((response) => {
			return response;
		})
	}

	get(uid: number): Promise<any> {
		return this.http.get(`${this.url}/${uid}`).toPromise().then((response) => {
			return response.json();
		});
	}

	update(storeActivity: any): Promise<number> {
		return this.http.put(`${this.url}/${storeActivity.uid}`, storeActivity).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
			return this.http.delete(`${this.url}/${id}/toggle-activation`).toPromise().then((response) => {
				console.log(response.status);
				return response.status;
			});
	}                
}
