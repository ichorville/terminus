/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeEditComponent } from './employee-edit.component';
import { EmployeeService } from '../employee.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  	ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: EmployeeEdit w/o Angular TestBed', () => {

	let comp: EmployeeEditComponent;
	let _es: any;
	let fb: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(async(() => { 
		router = new RouterStub as any as Router;
		_es = new StubService as any as EmployeeService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new EmployeeEditComponent(router, activatedRoute, _es, fb);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _es.employees[0].id;
		comp.formElements[1].value = _es.employees[0].firstName;
		comp.formElements[2].value = _es.employees[0].middleInitials;
		comp.formElements[3].value = _es.employees[0].lastName;
		comp.formElements[4].value = _es.employees[0].email;
		comp.formElements[5].value = _es.employees[0].registrationNumber;
		comp.formElements[6].value = _es.employees[0].streetAddress;
		comp.formElements[7].value = _es.employees[0].notes;
		comp.formElements[8].value = _es.employees[0].telephone;
		comp.formElements[9].value = _es.employees[0].designationType;

		formSubmitEvent = new FormSubmitEvent();
	}));

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
		expect(_es.employees[0].firstName).toEqual(newEmployee.firstName, 'exhisting employee firstName has been updated');
		expect(_es.employees[0].middleInitials).toEqual(newEmployee.middleInitials, 'exhisting employee middleInitials has been updated');
		expect(_es.employees[0].lastName).toEqual(newEmployee.lastName, 'exhisting employee lastName has been updated');
		expect(_es.employees[0].email).toEqual(newEmployee.email, 'exhisting employee email has been updated');
		expect(_es.employees[0].registrationNumber).toEqual(newEmployee.registrationNumber, 'exhisting employee registrationNumber has been updated');
		expect(_es.employees[0].streetAddress).toEqual(newEmployee.streetAddress, 'exhisting employee streetAddress has been updated');
		expect(_es.employees[0].notes).toEqual(newEmployee.notes, 'exhisting employee notes has been updated');
		expect(_es.employees[0].telephone).toEqual(+newEmployee.telephone, 'exhisting employee telephone has been updated');
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
	
	update(employee: any): Promise<any> {
		employee.uid = 6;
		// uid is not set hence id is used to findIndex
		let index = this.employees.findIndex((element) => {
			return element.id == employee.id;
		});
		this.employees[index].firstName = employee.firstName;
		this.employees[index].middleInitials = employee.middleInitials;
		this.employees[index].lastName = employee.lastName;
		this.employees[index].email = employee.email;
		this.employees[index].registrationNumber = employee.registrationNumber;
		this.employees[index].streetAddress = employee.streetAddress;
		this.employees[index].notes = employee.notes;
		this.employees[index].telephone = employee.telephone;
		this.employees[index].designationType = employee.designationType;
		return Promise.resolve(employee);
	}		
}