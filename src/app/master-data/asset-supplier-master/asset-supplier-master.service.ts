import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AssetSupplierMasterService {

    url: string;
	private headers: Headers;
    private options: RequestOptions;
    
    constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/suppliers`;
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

	create(supplier: any): Promise<any> {
		return this.http.post(this.url, supplier, this.options).toPromise().then((response) => {
			return response;
		});
	}

	update(supplier: any): Promise<number> {
		return this.http.put(`${this.url}/${supplier.uid}`, supplier).toPromise().then((response) => {
			return response.status;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}
}