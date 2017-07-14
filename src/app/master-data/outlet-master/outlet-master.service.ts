import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OutletMasterService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/outlets`;
		this.headers = new Headers({
			'Content-Type': 'application/json'	
		});
		this.options = new RequestOptions({headers: this.headers});
	}

	all(): Promise<any[]> {
		return this.http.get(this.url).toPromise().then((response) => {
			return response.json();
		});
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(outlet: any): Promise<any> {
		return this.http.post(this.url, outlet, this.options).toPromise().then((response) => {
			return response;
		});
	}

	update(outlet: any): Promise<number> {
		return this.http.put(`${this.url}/${outlet.uid}`, outlet).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}

	areas(): Promise<any[]> {
		return this.http.get(`${this.url}/geographicalarea`).toPromise().then((response) => {
			return response.json();
		});
	}

	classes(): Promise<any[]> {
		return this.http.get(`${this.url}/getclass`).toPromise().then((response) => {
			return response.json();
		});
	}
}
