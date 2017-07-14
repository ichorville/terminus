import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import {StoreActivitiesService } from './activities.service';

export class StoreActivity {
	id: number;
	name: string;
}

const makeStoreActivityData = () => [
	{ id: 1, name: 'StoreActivity 1' },
	{ id: 2, name: 'StoreActivity 2' },
	{ id: 3, name: 'StoreActivity 3' },
	{ id: 4, name: 'StoreActivity 4' }
] as StoreActivity[];

describe('Service: StoreActivity', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				StoreActivitiesService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([StoreActivitiesService], (service: StoreActivitiesService) => {
		expect(service instanceof StoreActivitiesService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new StoreActivitiesService(http);
		expect(service instanceof StoreActivitiesService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getStoreActivities', () => {
		let backend: MockBackend;
		let service: StoreActivitiesService;
		let fakeStoreActivities: StoreActivity[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new StoreActivitiesService(http);
			fakeStoreActivities = makeStoreActivityData();
			let options = new ResponseOptions({status: 200, body: { data: fakeStoreActivities }});
			response = new Response(options);
		}));

		it('should have expected fake storeActivity (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((storeActivities) => {
				expect(storeActivities['data'].length).toBe(fakeStoreActivities.length,
				'should have expected no. of storeActivities');
			});
		})));

		it('should be OK returning no storeActivities', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((storeActivities) => {
				expect(storeActivities['data'].length).toBe(0, 'should have no storeActivities');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(storeActivities => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
