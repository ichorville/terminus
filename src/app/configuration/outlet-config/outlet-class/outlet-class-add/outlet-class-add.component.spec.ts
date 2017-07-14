/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletClassAddComponent } from './outlet-class-add.component';
import { OutletClassService } from '../outlet-class.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: OutletClassAdd w/o Angular TestBed', () => {

	let comp: OutletClassAddComponent;
	let _ocs: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_ocs = new StubService as any as OutletClassService;
		comp = new OutletClassAddComponent(router, _ocs);

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {
		const newId = '5';
		comp.formElements[0].value = newId;

		const newDescription = 'Soap';
		comp.formElements[1].value = newDescription;

		const newPriority = '2';
		comp.formElements[2].value = newPriority;

		let newClass: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newClass;

		comp.submit(formSubmitEvent);
		expect(_ocs.classes.length).toEqual(3, 'service array has been updated');
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
	
	create(outletClass: any): Promise<any> {
		this.classes.push(outletClass);
		return Promise.resolve(outletClass);
	}		
}