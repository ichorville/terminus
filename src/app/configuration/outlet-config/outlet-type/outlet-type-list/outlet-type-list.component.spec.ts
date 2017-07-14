import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletTypeListComponent } from './outlet-type-list.component';
import { OutletTypeService } from '../outlet-type.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: OutletTypeList w/o Angular TestBed', () => {

	let comp: OutletTypeListComponent;
	let _ots: any;

	beforeEach(() => {
		_ots = new StubService as any as OutletTypeService;
		comp = new OutletTypeListComponent(_ots);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the outlet-type-list', () => {
		
		expect(comp.columns[0].name).toBe('Outlet type Id');
		expect(comp.columns[0].attr).toBe('typeId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Priority');
		expect(comp.columns[2].attr).toBe('priority');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	types: any;
	
	constructor() {
		this.types = [
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
		return Promise.resolve(this.types);
	}
}