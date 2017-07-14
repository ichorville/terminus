import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MerchandiserConfigService {

	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}`;
		this.headers = new Headers({
			'Content-Type': 'application/json'	
		});
		this.options = new RequestOptions({headers: this.headers});
	}

  	merchandiserOutlets(merchandiserId: number): Promise<any> {
		return this.http.get(`${this.url}/configuration/agents/${merchandiserId}/outlets`).toPromise().then((response) => {
			return response.json();
		});
	}

	assignOutlets(payload: any): Promise<any> {
		return this.http.post(`${this.url}/configuration/agents/outlets`, payload, this.options).toPromise().then((response) => {
			return response;
		})
	}

	merchandiserProducts(merchandiserId: number): Promise<any> {
		return this.http.get(`${this.url}/configuration/agents/${merchandiserId}/products`).toPromise().then((response) => {
			return response.json();
		});
	}

	assignProducts(payload: any): Promise<any> {          
		return this.http.post(`${this.url}/configuration/agents/products`, payload, this.options).toPromise().then((response) => {
		return response;
		})
	}

	/*all(): Promise<any[]> {
		return this.http.get(`${this.url}/getmerchandiser`).toPromise().then((response) => {
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
			return response.json();
		})
	}

	update(outlet: any): Promise<number> {
		return this.http.put(`${this.url}/${outlet.id}`, outlet).toPromise().then((response) => {
			return response.status;
		})
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}*/

}
