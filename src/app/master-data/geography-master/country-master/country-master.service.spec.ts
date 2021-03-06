/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { CountryMasterService } from './country-master.service';

export class Country {
	id: number;
	name: string;
}

const makeCountryData = () => [
	{ id: 1, name: 'Country 1' },
	{ id: 2, name: 'Country 2' },
	{ id: 3, name: 'Country 3' },
	{ id: 4, name: 'Country 4' }
] as Country[];

describe('Service: CountryMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				CountryMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([CountryMasterService], (service: CountryMasterService) => {
		expect(service instanceof CountryMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new CountryMasterService(http);
		expect(service instanceof CountryMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getCountries', () => {
		let backend: MockBackend;
		let service: CountryMasterService;
		let fakeCountries: Country[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new CountryMasterService(http);
			fakeCountries = makeCountryData();
			let options = new ResponseOptions({status: 200, body: { data: fakeCountries }});
			response = new Response(options);
		}));

		it('should have expected fake countries (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((countries) => {
				expect(countries['data'].length).toBe(fakeCountries.length,
				'should have expected no. of countries');
			});
		})));

		it('should be OK returning no countries', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((countries) => {
				expect(countries['data'].length).toBe(0, 'should have no countries');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(countries => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
