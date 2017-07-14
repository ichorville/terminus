/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { MerchandiserConfigService } from './merchandiser-config.service';

export class MerchandiserConfig {
	id: number;
	name: string;
}

const makeMerchandiserConfigData = () => [
	{ id: 1, name: 'MerchandiserConfig 1' },
	{ id: 2, name: 'MerchandiserConfig 2' },
	{ id: 3, name: 'MerchandiserConfig 3' },
	{ id: 4, name: 'MerchandiserConfig 4' }
] as MerchandiserConfig[];

describe('Service: MerchandiserConfigMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				MerchandiserConfigService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([MerchandiserConfigService], (service: MerchandiserConfigService) => {
		expect(service instanceof MerchandiserConfigService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new MerchandiserConfigService(http);
		expect(service instanceof MerchandiserConfigService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	//  describe('when getMerchandiserConfigs', () => {
	// 	let backend: MockBackend;
	// 	let service: MerchandiserConfigService;
	// 	let fakeMerchandiserConfigs: MerchandiserConfig[];
	// 	let response: Response;

	// 	beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
	// 		backend = be;
	// 		service = new MerchandiserConfigService(http);
	// 		fakeMerchandiserConfigs = makeMerchandiserConfigData();
	// 		let options = new ResponseOptions({status: 200, body: { data: fakeMerchandiserConfigs }});
	// 		response = new Response(options);
	// 	}));

	// 	it('should have expected fake merchandiserConfigs (then)', async(inject([], () => {
	// 		backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
	// 		service.all().then((merchandiserConfigs) => {
	// 			expect(merchandiserConfigs['data'].length).toBe(fakeMerchandiserConfigs.length,
	// 			'should have expected no. of merchandiserConfigs');
	// 		});
	// 	})));

	// 	it('should be OK returning no merchandiserConfigs', async(inject([], () => {
	// 		let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
	// 		backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

	// 		service.all().then((merchandiserConfigs) => {
	// 			expect(merchandiserConfigs['data'].length).toBe(0, 'should have no merchandiserConfigs');
	// 		});
	// 	})));

	// 	it('should treat 404 as error', async(inject([], () => {
	// 		let resp = new Response(new ResponseOptions({ status: 404 }));
	// 		backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

	// 		service.all().then(merchandiserConfigs => {
	// 			throw new Error(resp.statusText || '404');
	// 		})
	// 		.catch(err => {
	// 			expect(err).toMatch('404', 'should catch bad response status code');
	// 			return Observable.of(null); // failure is the expected test result
	// 		});
	// 	})));
	// });
});
