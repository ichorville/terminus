import { ComponentFixture, TestBed, 
	 async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { StoreLocationsListComponent } from './store-locations-list.component';
import { StoreLocationsService } from '../locations.service';

describe('Component: StoreLocationsListComponent', () => {

	let comp: StoreLocationsListComponent;
	let _ocs: any;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		_ocs = new StubService as any as StoreLocationsService;
		comp = new StoreLocationsListComponent(_ocs);
		formSubmitEvent = new FormSubmitEvent();
		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the store locations list', () => {
	
		expect(comp.columns[0].name).toBe('Store Location Id');
		expect(comp.columns[0].attr).toBe('locationId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');;

		expect(comp.columns[2].name).toBe('Priority');
		expect(comp.columns[2].attr).toBe('priority');;

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	storeLocation: any;
	
	constructor() {
		this.storeLocation = [
			{
				id: 2,
				description: "des 1 ",
				priority: '1'
			},
			{
				id: 3,
				description: "des 2",
				priority: '2'
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.storeLocation);
	}
}
