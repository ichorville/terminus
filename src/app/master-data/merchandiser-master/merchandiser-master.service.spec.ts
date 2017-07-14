/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { MerchandiserMasterService } from './merchandiser-master.service';

export class Merchandiser {
	id: number;
	name: string;
}

const makeMerchandiserData = () => [
	{ id: 1, name: 'Merchandiser 1' },
	{ id: 2, name: 'Merchandiser 2' },
	{ id: 3, name: 'Merchandiser 3' },
	{ id: 4, name: 'Merchandiser 4' }
] as Merchandiser[];

describe('Service: MerchandiserMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				MerchandiserMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([MerchandiserMasterService], (service: MerchandiserMasterService) => {
		expect(service instanceof MerchandiserMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new MerchandiserMasterService(http);
		expect(service instanceof MerchandiserMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getMerchandisers', () => {
		let backend: MockBackend;
		let service: MerchandiserMasterService;
		let fakeMerchandisers: Merchandiser[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new MerchandiserMasterService(http);
			fakeMerchandisers = makeMerchandiserData();
			let options = new ResponseOptions({status: 200, body: { data: fakeMerchandisers }});
			response = new Response(options);
		}));

		it('should have expected fake merchandisers (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((merchandisers) => {
				expect(merchandisers['data'].length).toBe(fakeMerchandisers.length,
				'should have expected no. of merchandisers');
			});
		})));

		it('should be OK returning no merchandisers', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((merchandisers) => {
				expect(merchandisers['data'].length).toBe(0, 'should have no merchandisers');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(merchandisers => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
