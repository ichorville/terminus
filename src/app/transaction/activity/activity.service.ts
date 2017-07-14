import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { GlobalVariable } from '../../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {
	url: string;
	private headers: Headers;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.url = `${GlobalVariable.BASE_API_URL}/transactions/activitydetails/`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(activity:any): Promise<any[]> {
		return this.http.get(`${this.url}/${activity.from}/${activity.to}/${activity.merchandiser}/${activity.outlet}/${activity.customer}/${activity.brand}/${activity.category}/${activity.product}/${activity.activity}/${activity.location}`).toPromise().then((response) => {
			return response.json();
		});
	}
}
