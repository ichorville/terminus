/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { OutletClassService } from './outlet-class.service';

export class OutletClass {
	id: number;
	name: string;
}

const makeOutletClassData = () => [
	{ id: 1, name: 'OutletClass 1' },
	{ id: 2, name: 'OutletClass 2' },
	{ id: 3, name: 'OutletClass 3' },
	{ id: 4, name: 'OutletClass 4' }
] as OutletClass[];

describe('Service: OutletClass', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				OutletClassService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([OutletClassService], (service: OutletClassService) => {
		expect(service instanceof OutletClassService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new OutletClassService(http);
		expect(service instanceof OutletClassService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getOutlets', () => {
		let backend: MockBackend;
		let service: OutletClassService;
		let fakeOutlets: OutletClass[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new OutletClassService(http);
			fakeOutlets = makeOutletClassData();
			let options = new ResponseOptions({status: 200, body: { data: fakeOutlets }});
			response = new Response(options);
		}));

		it('should have expected fake outletClasses (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((outletClasses) => {
				expect(outletClasses['data'].length).toBe(fakeOutlets.length,
				'should have expected no. of outletClasses');
			});
		})));

		it('should be OK returning no outletClasses', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((outletClasses) => {
				expect(outletClasses['data'].length).toBe(0, 'should have no outletClasses');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(outletClasses => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
