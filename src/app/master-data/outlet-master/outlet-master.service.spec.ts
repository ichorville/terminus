/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { OutletMasterService } from './outlet-master.service';

export class Outlet {
	id: number;
	name: string;
}

const makeOutletData = () => [
	{ id: 1, name: 'Outlet 1' },
	{ id: 2, name: 'Outlet 2' },
	{ id: 3, name: 'Outlet 3' },
	{ id: 4, name: 'Outlet 4' }
] as Outlet[];

describe('Service: OutletMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				OutletMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([OutletMasterService], (service: OutletMasterService) => {
		expect(service instanceof OutletMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new OutletMasterService(http);
		expect(service instanceof OutletMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getOutlets', () => {
		let backend: MockBackend;
		let service: OutletMasterService;
		let fakeOutlets: Outlet[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new OutletMasterService(http);
			fakeOutlets = makeOutletData();
			let options = new ResponseOptions({status: 200, body: { data: fakeOutlets }});
			response = new Response(options);
		}));

		it('should have expected fake outlets (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((outlets) => {
				expect(outlets['data'].length).toBe(fakeOutlets.length,
				'should have expected no. of outlets');
			});
		})));

		it('should be OK returning no outlets', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((outlets) => {
				expect(outlets['data'].length).toBe(0, 'should have no outlets');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(outlets => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
