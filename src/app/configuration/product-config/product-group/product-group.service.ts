import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../../global';

@Injectable()
export class ProductGroupService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/configuration/products/groups`;
		this.headers = new Headers({
			'Content-Type': 'application/json'	
		});
		this.options = new RequestOptions({headers: this.headers});
	}

	all(): Promise<any[]> {
		return this.http.get(`${this.url}`).toPromise().then((response) => {
			return response.json();
		});
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(productGroup: any): Promise<any> {
		return this.http.post(this.url, productGroup, this.options).toPromise().then((response) => {
			return response;
		});
	}

	update(productGroup: any): Promise<number> {
		return this.http.put(`${this.url}/${productGroup.uid}`, productGroup).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}
}