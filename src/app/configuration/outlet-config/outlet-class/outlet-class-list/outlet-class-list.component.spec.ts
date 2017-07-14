/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletClassListComponent } from './outlet-class-list.component';
import { OutletClassService } from '../outlet-class.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: OutletClassList w/o Angular TestBed', () => {

	let comp: OutletClassListComponent;
	let _ocs: any;

	beforeEach(() => {
		_ocs = new StubService as any as OutletClassService;
		comp = new OutletClassListComponent(_ocs);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the outlet-class-list', () => {

		expect(comp.columns[0].name).toBe('Outlet Class Id');
		expect(comp.columns[0].attr).toBe('classId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');;

		expect(comp.columns[2].name).toBe('Priority');
		expect(comp.columns[2].attr).toBe('priority');;

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	classes: any;
	
	constructor() {
		this.classes = [
			{
				id: 2,
				description: "class 1",
				priority: '1'
			},
			{
				id: 3,
				description: "class 2",
				priority: '2'
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.classes);
	}
}