/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { CustomerMasterService } from './customer-master.service';

export class Customer {
	id: number;
	name: string;
}

const makeCustomerData = () => [
	{ id: 1, name: 'Customer 1' },
	{ id: 2, name: 'Customer 2' },
	{ id: 3, name: 'Customer 3' },
	{ id: 4, name: 'Customer 4' }
] as Customer[];

describe('Service: CustomerMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				CustomerMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([CustomerMasterService], (service: CustomerMasterService) => {
		expect(service instanceof CustomerMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new CustomerMasterService(http);
		expect(service instanceof CustomerMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getCustomers', () => {
		let backend: MockBackend;
		let service: CustomerMasterService;
		let fakeCustomers: Customer[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new CustomerMasterService(http);
			fakeCustomers = makeCustomerData();
			let options = new ResponseOptions({status: 200, body: { data: fakeCustomers }});
			response = new Response(options);
		}));

		it('should have expected fake customers (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((customers) => {
				expect(customers['data'].length).toBe(fakeCustomers.length,
				'should have expected no. of customers');
			});
		})));

		it('should be OK returning no customers', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((customers) => {
				expect(customers['data'].length).toBe(0, 'should have no customers');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(customers => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
