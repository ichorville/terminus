/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { SurveyService } from './survey.service';

export class Survey {
	id: number;
	name: string;
}

const makeSurveyData = () => [
	{ id: 1, name: 'Survey 1' },
	{ id: 2, name: 'Survey 2' },
	{ id: 3, name: 'Survey 3' },
	{ id: 4, name: 'Survey 4' }
] as Survey[];

describe('Service: SurveyService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				SurveyService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});
    let survey: any = {
        'from': '2016-01-01',
        'to': '2017-01-01',
        'status': '0'
    };
    
	it('can instantiate service when inject service',
		inject([SurveyService], (service: SurveyService) => {
		expect(service instanceof SurveyService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new SurveyService(http);
		expect(service instanceof SurveyService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getSurveys', () => {
		let backend: MockBackend;
		let service: SurveyService;
		let fakeSurveys: Survey[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new SurveyService(http);
			fakeSurveys = makeSurveyData();
			let options = new ResponseOptions({status: 200, body: { data: fakeSurveys }});
			response = new Response(options);

		}));

		it('should have expected fake Survey (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all(survey).then((Surveys) => {
				expect(Surveys['data'].length).toBe(fakeSurveys.length,
				'should have expected no. of Surveys');
			});
		})));

		it('should be OK returning no Surveys', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(survey).then((Surveys) => {
				expect(Surveys['data'].length).toBe(0, 'should have no Surveys');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(survey).then(surveys => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
