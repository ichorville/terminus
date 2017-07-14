/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { StoreActivityListComponent } from './store-activity-list.component';
import { StoreActivityConfigService } from '../store-activity-config.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

describe('Component: StoreActivityListComponent', () => {

  	let comp: StoreActivityListComponent;
	let _sas: any;

	beforeEach(() => {
		_sas = new StubService as any as StoreActivityConfigService;
		comp = new StoreActivityListComponent(_sas);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the store-activity-list', () => {
		console.log(comp.columns.length);
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('id');
	
		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Priority');
		expect(comp.columns[2].attr).toBe('priority');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	activities: any;
	
	constructor() {
		this.activities = [
			{
				id: 2,
				description: "type 1"
			},
			{
				id: 3,
				description: "type 2"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.activities);
	}
}