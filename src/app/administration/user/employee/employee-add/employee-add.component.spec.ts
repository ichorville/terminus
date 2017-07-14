/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeAddComponent } from './employee-add.component';
import { EmployeeService } from '../employee.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: EmployeeAdd w/o Angular TestBed', () => {

	let comp: EmployeeAddComponent;
	let _es: any;
	let fb: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_es = new StubService as any as EmployeeService;
		comp = new EmployeeAddComponent(router, _es, fb);

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 11 form elements', () => {
		expect(comp.formElements.length).toBe(11);
	});

	it('should check whether submit works',()=> {
		const newFirstname = 'Jay';
		comp.formElements[1].value = newFirstname;

		const newMiddleInitials = 'Mc';
		comp.formElements[2].value = newMiddleInitials;

		const newLastName = 'Connoe';
		comp.formElements[3].value = newLastName;

		const newEmail = 'jay@connor.lk';
		comp.formElements[4].value = newEmail;

		const newRegNumber = '89';
		comp.formElements[5].value = newRegNumber;

		const newAddress = 'Pandora';
		comp.formElements[6].value = newAddress;

		const newNotes = 'Notation';
		comp.formElements[7].value = newNotes;

		const newTelephone = '0212227889';
		comp.formElements[8].value = newTelephone;

		const newDesignation = 'ASM';
		comp.formElements[9].value = newDesignation;

		let newEmployee: any = {
			'uid': 6,
			'id': comp.formElements[0].value,	
			'firstName': comp.formElements[1].value,	
			'middleInitials': comp.formElements[2].value,
			'lastName': comp.formElements[3].value,		
			'email': comp.formElements[4].value,		
			'registrationNumber': comp.formElements[5].value,		
			'streetAddress': comp.formElements[6].value,		
			'notes': comp.formElements[7].value,		
			'telephone': comp.formElements[8].value,		
			'designationType': comp.formElements[9].value,		
		};
		formSubmitEvent.formObject = newEmployee;

		comp.onSubmit();
		expect(_es.employees.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	employees: any;
	
	constructor() {
		this.employees = [
			{
				uid: 6,
				id: "Id 11",
				firstName: "Thenuwara",
				middleInitials: "D",
				lastName: "The",
				email: "jay@alfalfa.lk",
				registrationNumber: "1023",
				streetAddress: "Galle Road, Pandora",
				notes: "Regular respiration just for two weeks",
				telephone: "212223445",
				designationType: "Merchandizer"
			},
			{
				uid: 7,
				id: "Id 11",
				firstName: "Thenuwara",
				middleInitials: "D",
				lastName: "The",
				email: "jay@alfalfa.lk",
				registrationNumber: "1023",
				streetAddress: "Galle Road, Pandora",
				notes: "Regular respiration just for two weeks",
				telephone: "212223445",
				designationType: "Merchandizer"
			}
		];
	}
	
	create(employee: any): Promise<any> {
		this.employees.push(employee);
		return Promise.resolve(employee);
	}	
}