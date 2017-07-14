/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ActivityService } from './activity.service';

export class Activity {
	id: number;
	name: string;
}

const makeActivityData = () => [
	{ id: 1, name: 'Activity 1' },
	{ id: 2, name: 'Activity 2' },
	{ id: 3, name: 'Activity 3' },
	{ id: 4, name: 'Activity 4' }
] as Activity[];

describe('Service: ActivityService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				ActivityService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});
    let activity: any = {
        'from': '2016-01-01',
        'to': '2017-01-01',
        'merchandiser': '-1',
        'customer': '-1',
        'outlet': '-1',
        'brand': '-1',
        'category': '-1',
        'product': '-1',
        'activity': '-1',
        'location': '-1'
    };
    
	it('can instantiate service when inject service',
		inject([ActivityService], (service: ActivityService) => {
		expect(service instanceof ActivityService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new ActivityService(http);
		expect(service instanceof ActivityService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getActivities', () => {
		let backend: MockBackend;
		let service: ActivityService;
		let fakeActivities: Activity[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new ActivityService(http);
			fakeActivities = makeActivityData();
			let options = new ResponseOptions({status: 200, body: { data: fakeActivities }});
			response = new Response(options);

		}));

		it('should have expected fake activity (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all(activity).then((activities) => {
				expect(activities['data'].length).toBe(fakeActivities.length,
				'should have expected no. of Activities');
			});
		})));

		it('should be OK returning no activities', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(activity).then((activities) => {
				expect(activities['data'].length).toBe(0, 'should have no activities');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(activity).then(activities => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
