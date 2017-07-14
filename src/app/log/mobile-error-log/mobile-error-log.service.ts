import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { GlobalVariable } from '../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MobileErrorLogService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/logs/mobile/errors`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(date:any): Promise<any[]> {
		return this.http.get(`${this.url}/${date.from}/${date.to}`).toPromise().then((response) => {
			return response.json();
		});
	}
}
