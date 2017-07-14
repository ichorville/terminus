/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { OutletTypeService } from './outlet-type.service';

export class OutletType {
	id: number;
	name: string;
}

const makeOutletTypeData = () => [
	{ id: 1, name: 'OutletType 1' },
	{ id: 2, name: 'OutletType 2' },
	{ id: 3, name: 'OutletType 3' },
	{ id: 4, name: 'OutletType 4' }
] as OutletType[];

describe('Service: OutletType', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				OutletTypeService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([OutletTypeService], (service: OutletTypeService) => {
		expect(service instanceof OutletTypeService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new OutletTypeService(http);
		expect(service instanceof OutletTypeService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getOutletTypes', () => {
		let backend: MockBackend;
		let service: OutletTypeService;
		let fakeOutlets: OutletType[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new OutletTypeService(http);
			fakeOutlets = makeOutletTypeData();
			let options = new ResponseOptions({status: 200, body: { data: fakeOutlets }});
			response = new Response(options);
		}));

		it('should have expected fake outletTypes (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((outletTypes) => {
				expect(outletTypes['data'].length).toBe(fakeOutlets.length,
				'should have expected no. of outletTypes');
			});
		})));

		it('should be OK returning no outletTypes', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((outletTypes) => {
				expect(outletTypes['data'].length).toBe(0, 'should have no outletTypes');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(outletTypes => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
