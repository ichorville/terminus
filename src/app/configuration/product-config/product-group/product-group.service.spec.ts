/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ProductGroupService } from './product-group.service';

export class ProductGroup {
	id: number;
	name: string;
}

const makeProductGroupData = () => [
	{ id: 1, name: 'ProductGroup 1' },
	{ id: 2, name: 'ProductGroup 2' },
	{ id: 3, name: 'ProductGroup 3' },
	{ id: 4, name: 'ProductGroup 4' }
] as ProductGroup[];

describe('Service: ProductGroup', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				ProductGroupService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([ProductGroupService], (service: ProductGroupService) => {
		expect(service instanceof ProductGroupService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new ProductGroupService(http);
		expect(service instanceof ProductGroupService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getProductGroups', () => {
		let backend: MockBackend;
		let service: ProductGroupService;
		let fakeProducts: ProductGroup[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new ProductGroupService(http);
			fakeProducts = makeProductGroupData();
			let options = new ResponseOptions({status: 200, body: { data: fakeProducts }});
			response = new Response(options);
		}));

		it('should have expected fake productGroups (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((productGroups) => {
				expect(productGroups['data'].length).toBe(fakeProducts.length,
				'should have expected no. of productGroups');
			});
		})));

		it('should be OK returning no productGroups', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((productGroups) => {
				expect(productGroups['data'].length).toBe(0, 'should have no productGroups');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(productGroups => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
