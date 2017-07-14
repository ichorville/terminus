import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductMasterService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;
   
	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/products`;
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

	create(product: any): Promise<any> {
		return this.http.post(this.url, product, this.options).toPromise().then((response) => {
			return response;
		})
	}

	update(product: any): Promise<any> {
		return this.http.put(`${this.url}/${product.uid}`, product).toPromise().then((response) => {
			return response;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}

	categories(): Promise<any[]> {
		return this.http.get(`${GlobalVariable.BASE_API_URL}/configuration/products/categories`).toPromise().then((response) => {
			return response.json();
		});
	}
}
