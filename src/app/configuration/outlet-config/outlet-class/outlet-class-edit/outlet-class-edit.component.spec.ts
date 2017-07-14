/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletClassEditComponent } from './outlet-class-edit.component';
import { OutletClassService } from '../outlet-class.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: OutletClassEdit w/o Angular TestBed', () => {

	let comp: OutletClassEditComponent;
	let _ocs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_ocs = new StubService as any as OutletClassService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new OutletClassEditComponent(router, activatedRoute, _ocs);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _ocs.classes[1].id;
		comp.formElements[1].value = _ocs.classes[1].description;
		comp.formElements[2].value = _ocs.classes[1].priority;

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newDescription = 'Paper';
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
		expect(_ocs.classes[1].description).toEqual(newClass.description, 'exhisting productType description has been updated');
		expect(_ocs.classes[1].priority).toEqual(newClass.priority, 'exhisting productType priority has been updated');
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
	
	update(outletClass: any): Promise<any> {
		let index = this.classes.findIndex((element) => {
			return element.id == outletClass.id;
		});
		this.classes[index].description = outletClass.description;
		this.classes[index].priority = outletClass.priority;
		return Promise.resolve(outletClass);
	}		
}