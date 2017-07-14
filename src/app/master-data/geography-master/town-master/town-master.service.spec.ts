/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { TownMasterService } from './town-master.service';

export class Town {
	id: number;
	name: string;
}

const makeTownData = () => [
	{ id: 1, name: 'Town 1' },
	{ id: 2, name: 'Town 2' },
	{ id: 3, name: 'Town 3' },
	{ id: 4, name: 'Town 4' }
] as Town[];

describe('Service: TownMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				TownMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([TownMasterService], (service: TownMasterService) => {
		expect(service instanceof TownMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new TownMasterService(http);
		expect(service instanceof TownMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getTowns', () => {
		let backend: MockBackend;
		let service: TownMasterService;
		let fakeTowns: Town[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new TownMasterService(http);
			fakeTowns = makeTownData();
			let options = new ResponseOptions({status: 200, body: { data: fakeTowns }});
			response = new Response(options);
		}));

		it('should have expected fake towns (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((towns) => {
				expect(towns['data'].length).toBe(fakeTowns.length,
				'should have expected no. of towns');
			});
		})));

		it('should be OK returning no towns', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((towns) => {
				expect(towns['data'].length).toBe(0, 'should have no towns');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(towns => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
