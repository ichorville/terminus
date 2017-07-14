/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { CallService } from './call.service';

export class Call {
	id: number;
	name: string;
}

const makeCallData = () => [
	{ id: 1, name: 'call 1' },
	{ id: 2, name: 'call 2' },
	{ id: 3, name: 'call 3' },
	{ id: 4, name: 'call 4' }
] as Call[];

describe('Service: CallService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				CallService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});
    let call: any = {
        'from': '2016-01-01',
        'to': '2017-01-01',
        'status': '0'
    };
    
	it('can instantiate service when inject service',
		inject([CallService], (service: CallService) => {
		expect(service instanceof CallService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new CallService(http);
		expect(service instanceof CallService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getCalls', () => {
		let backend: MockBackend;
		let service: CallService;
		let fakeCalls: Call[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new CallService(http);
			fakeCalls = makeCallData();
			let options = new ResponseOptions({status: 200, body: { data: fakeCalls }});
			response = new Response(options);

		}));

		it('should have expected fake call (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all(call).then((calls) => {
				expect(calls['data'].length).toBe(fakeCalls.length,
				'should have expected no. of Calls');
			});
		})));

		it('should be OK returning no calls', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(call).then((calls) => {
				expect(calls['data'].length).toBe(0, 'should have no calls');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all(call).then(calls => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
