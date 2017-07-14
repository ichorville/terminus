import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { StoreActivitiesListComponent } from './store-activities-list.component';
import { StoreActivitiesService } from '../activities.service';

describe('Component: StoreActivitiesListComponent', () => {

	let comp: StoreActivitiesListComponent;
	let _ocs: any;

	beforeEach(() => {
		_ocs = new StubService as any as StoreActivitiesService;
		comp = new StoreActivitiesListComponent(_ocs);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
    
	it('should fetch the store activity list', () => {
	
		expect(comp.columns[0].name).toBe('Store Activity Id');
		expect(comp.columns[0].attr).toBe('activityId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Priority');
		expect(comp.columns[2].attr).toBe('priority');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	storeActivity: any;
	
	constructor() {
		this.storeActivity = [
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
		return Promise.resolve(this.storeActivity);
	}
}
