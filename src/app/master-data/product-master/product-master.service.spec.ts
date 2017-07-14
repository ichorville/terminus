/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ProductMasterService } from './product-master.service';

export class Product {
	id: number;
	name: string;
}

const makeProductData = () => [
	{ id: 1, name: 'Product 1' },
	{ id: 2, name: 'Product 2' },
	{ id: 3, name: 'Product 3' },
	{ id: 4, name: 'Product 4' }
] as Product[];

describe('Service: ProductMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				ProductMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([ProductMasterService], (service: ProductMasterService) => {
		expect(service instanceof ProductMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new ProductMasterService(http);
		expect(service instanceof ProductMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getProducts', () => {
		let backend: MockBackend;
		let service: ProductMasterService;
		let fakeProducts: Product[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new ProductMasterService(http);
			fakeProducts = makeProductData();
			let options = new ResponseOptions({status: 200, body: { data: fakeProducts }});
			response = new Response(options);
		}));

		it('should have expected fake products (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((products) => {
				expect(products['data'].length).toBe(fakeProducts.length,
				'should have expected no. of products');
			});
		})));

		it('should be OK returning no products', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((products) => {
				expect(products['data'].length).toBe(0, 'should have no products');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(products => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
