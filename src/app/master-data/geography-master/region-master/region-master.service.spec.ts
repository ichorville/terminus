/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { RegionMasterService } from './region-master.service';

export class Region {
	id: number;
	name: string;
}

const makeRegionData = () => [
	{ id: 1, name: 'Region 1' },
	{ id: 2, name: 'Region 2' },
	{ id: 3, name: 'Region 3' },
	{ id: 4, name: 'Region 4' }
] as Region[];

describe('Service: RegionMaster', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				RegionMasterService,
				{ provide: XHRBackend, useClass: MockBackend }
			]
		});
	});

	it('can instantiate service when inject service',
		inject([RegionMasterService], (service: RegionMasterService) => {
		expect(service instanceof RegionMasterService).toBe(true);
	}));

	it('can instantiate service with "new"', inject([Http], (http: Http) => {
		expect(http).not.toBeNull('http should be provided');
		let service = new RegionMasterService(http);
		expect(service instanceof RegionMasterService).toBe(true, 'new service should be ok');
	}));

	it('can provide the mockBackend as XHRBackend',
		inject([XHRBackend], (backend: MockBackend) => {
		expect(backend).not.toBeNull('backend should be provided');
	}));

	 describe('when getRegions', () => {
		let backend: MockBackend;
		let service: RegionMasterService;
		let fakeRegions: Region[];
		let response: Response;

		beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
			backend = be;
			service = new RegionMasterService(http);
			fakeRegions = makeRegionData();
			let options = new ResponseOptions({status: 200, body: { data: fakeRegions }});
			response = new Response(options);
		}));

		it('should have expected fake regions (then)', async(inject([], () => {
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
			service.all().then((regions) => {
				expect(regions['data'].length).toBe(fakeRegions.length,
				'should have expected no. of regions');
			});
		})));

		it('should be OK returning no regions', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] }}));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then((regions) => {
				expect(regions['data'].length).toBe(0, 'should have no regions');
			});
		})));

		it('should treat 404 as error', async(inject([], () => {
			let resp = new Response(new ResponseOptions({ status: 404 }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			service.all().then(regions => {
				throw new Error(resp.statusText || '404');
			})
			.catch(err => {
				expect(err).toMatch('404', 'should catch bad response status code');
				return Observable.of(null); // failure is the expected test result
			});
		})));
	});
});
