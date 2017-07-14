import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { GlobalVariable } from '../../../global';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

	designations: any;

  	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/administration/employees`;
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

	getAllDesignations(): Promise<any> {
		return this.http.get(`${this.url}/designation`).toPromise().then((response) => {
			return response.json();
		});
	}

	get(id: number): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise().then((response) => {
			return response.json();
		});
	}

	create(employee: any): Promise<any> {
		return this.http.post(this.url, employee, this.options).toPromise().then((response) => {
			return response;
		});
	}

	update(employee: any): Promise<any> {
		return this.http.put(`${this.url}/${employee.uid}`, employee).toPromise().then((response) => {
			return response;
		});
	}

	remove(id: string): Promise<number> {
		return this.http.delete(`${this.url}/${id}`).toPromise().then((response) => {
			return response.status;
		});
	}
}
