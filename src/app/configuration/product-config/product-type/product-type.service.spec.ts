/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ProductTypeService } from './product-type.service';

export class ProductType {
	id: number;
	name: string;
}

const makeProductTypeData = () => [
	{ id: 1, name: 'ProductType 1' },
	{ id: 2, name: 'ProductType 2' },
	{ id: 3, name: 'ProductType 3' },
	{ id: 4, name: 'ProductType 4' }
] as ProductType[];

describe('Service: ProductType', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				ProductTypeService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([ProductTypeService], (service: ProductTypeService) => {
		expect(service instanceof ProductTypeService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new ProductTypeService(http);
		expect(service instanceof ProductTypeService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getProductTypes', () => {
		let backend: MockBackend;
		let service: ProductTypeService;
		let fakeProducts: ProductType[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new ProductTypeService(http);
			fakeProducts = makeProductTypeData();
			let options = new ResponseOptions({status: 200, body: { data: fakeProducts }});
			response = new Response(options);
		}));

		it('should have expected fake productTypes (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((productTypes) => {
				expect(productTypes['data'].length).toBe(fakeProducts.length,
				'should have expected no. of productTypes');
			});
		})));

		it('should be OK returning no productTypes', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((productTypes) => {
				expect(productTypes['data'].length).toBe(0, 'should have no productTypes');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(productTypes => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
