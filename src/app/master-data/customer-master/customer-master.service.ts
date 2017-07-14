import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { GlobalVariable } from '../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerMasterService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/customers`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(): Promise<any[]> {
		return this.http.get(this.url).toPromise().then((response) => {
			return response.json();
		});
	}

	create(customer: any): Promise<any> {
		return this.http.post(this.url, customer, this.options).toPromise().then((response) => {
			return response.status;
		});
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	update(customer: any): Promise<number> {
		return this.http.put(`${this.url}/${customer.uid}`, customer).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}
}
