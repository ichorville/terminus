/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: EmployeeList w/o Angular TestBed', () => {

  	let comp: EmployeeListComponent;
	let _es: any;

	beforeEach(() => {
		_es = new StubService as any as EmployeeService;
		comp = new EmployeeListComponent(_es);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the employee-list', () => {
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('employeeId');

		expect(comp.columns[1].name).toBe('First Name');
		expect(comp.columns[1].attr).toBe('firstName');

		expect(comp.columns[2].name).toBe('Last Name');
		expect(comp.columns[2].attr).toBe('lastName');

		expect(comp.columns[3].name).toBe('Employee');
		expect(comp.columns[3].attr).toBe('employee');

		expect(comp.columns[4].name).toBe('Email');
		expect(comp.columns[4].attr).toBe('email');

		expect(comp.columns[5].name).toBe('User Name');
		expect(comp.columns[5].attr).toBe('userName');

		expect(comp.columns[6].name).toBe('Manager');
		expect(comp.columns[6].attr).toBe('manager');

		expect(comp.columns.length).toBe(7);
	});
}); 

class StubService {
	employees: any;
	
	constructor() {
		this.employees = [
			{
				uid: 6,
				id: 'Id 1',
				employee: 'Thenuwara The',
				designationType: '1',
				userName: null,
				manager: null,
				email: null
			},
			{
				uid: 7,
				id: 'Id 2',
				employee: 'Thenuwara The',
				designationType: '1',
				userName: null,
				manager: null,
				email: null
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.employees);
	}
}
