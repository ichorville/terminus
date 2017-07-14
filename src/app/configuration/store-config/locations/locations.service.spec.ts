/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { StoreLocationsService } from './locations.service';

export class StoreLocation {
	id: number;
	name: string;
}

const makeStoreLocationData = () => [
	{ id: 1, name: 'StoreLocation 1' },
	{ id: 2, name: 'StoreLocation 2' },
	{ id: 3, name: 'StoreLocation 3' },
	{ id: 4, name: 'StoreLocation 4' }
] as StoreLocation[];

describe('Service: StoreLocation', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				StoreLocationsService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([StoreLocationsService], (service: StoreLocationsService) => {
		expect(service instanceof StoreLocationsService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new StoreLocationsService(http);
		expect(service instanceof StoreLocationsService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getStoreLocations', () => {
		let backend: MockBackend;
		let service: StoreLocationsService;
		let fakeStoreLocations: StoreLocation[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new StoreLocationsService(http);
			fakeStoreLocations = makeStoreLocationData();
			let options = new ResponseOptions({status: 200, body: { data: fakeStoreLocations }});
			response = new Response(options);
		}));

		it('should have expected fake StoreLocations (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((StoreLocations) => {
				expect(StoreLocations['data'].length).toBe(fakeStoreLocations.length,
				'should have expected no. of StoreLocations');
			});
		})));

		it('should be OK returning no StoreLocations', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((StoreLocations) => {
				expect(StoreLocations['data'].length).toBe(0, 'should have no StoreLocations');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(StoreLocations => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
