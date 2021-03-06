import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../../global';

@Injectable()
export class RegionMasterService {


	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http:Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/geographies/regions`;
		this.headers = new Headers({
			'Content-Type': 'application/json'	
		});
		this.options = new RequestOptions({headers: this.headers});
	}


	all(): Promise<any> {
		return this.http.get(`${this.url}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(regions: any): Promise<any> {
		return this.http.post(this.url, regions, this.options).toPromise().then((response) => {
			return response.status;
		})
	}

	update(region: any): Promise<number> {
		return this.http.put(`${this.url}/${region.uid}`, region).toPromise().then((response) => {
			return response.status;
		});
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}
}
