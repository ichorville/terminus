/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductTypeAddComponent } from './product-type-add.component';
import { ProductTypeService } from '../product-type.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: ProductTypeAdd w/o Angular TestBed', () => {

	let comp: ProductTypeAddComponent;
	let _pts: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pts = new StubService as any as ProductTypeService;
		comp = new ProductTypeAddComponent(router, _pts);

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

		let newType: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newType;

		comp.submit(formSubmitEvent);
		expect(_pts.types.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	types: any;
	
	constructor() {
		this.types = [
			{
				id: 2,
				description: "type 1",
				priority: '1'
			},
			{
				id: 3,
				description: "type 2",
				priority: '2'
			}
		];
	}
	
	create(type: any): Promise<any> {
		this.types.push(type);
		return Promise.resolve(type);
	}		
}