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
		this.url = `${GlobalVariable.BASE_API_URL}/transactions/surveys/`;
		this.headers = new Headers({
			'Content-Type': 'application/json'
		});
		this.options = new RequestOptions({ headers: this.headers });
	}

	all(survey:any): Promise<any[]> {
		return this.http.get(`${this.url}/${survey.merchandiser}/${survey.customer}/${survey.outlet}/${survey.survey}/${survey.from}/${survey.to}`).toPromise().then((response) => {
			return response.json();
		});
	}

	surveyDetails(): Promise<any[]> {
		return this.http.get(`http://10.20.10.16/NestleAPI/api/surveys`).toPromise().then((response) => {
			return response.json();
		});
	}
}