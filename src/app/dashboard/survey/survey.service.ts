import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { GlobalVariable } from '../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SurveyService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/dashboard/surveys`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	get(customer: string, outlet?: string): Promise<any> {
		let url = outlet ? `${this.url}/${customer}/${outlet}` : `${this.url}/${customer}`;
		return this.http.get(url).toPromise().then((response) => {
			return response.json();
		});
	}

}
