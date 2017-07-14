/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductTypeEditComponent } from './product-type-edit.component';
import { ProductTypeService } from '../product-type.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: ProductTypeEdit w/o Angular TestBed', () => {

	let comp: ProductTypeEditComponent;
	let _pts: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pts = new StubService as any as ProductTypeService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new ProductTypeEditComponent(router, activatedRoute, _pts);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _pts.types[1].id;
		comp.formElements[1].value = _pts.types[1].description;
		comp.formElements[2].value = _pts.types[1].priority;

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

		let newType: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newType;

		comp.submit(formSubmitEvent);
		expect(_pts.types[1].description).toEqual(newType.description, 'exhisting productType description has been updated');
		expect(_pts.types[1].priority).toEqual(newType.priority, 'exhisting productType priority has been updated');
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
	
	update(type: any): Promise<any> {
		let index = this.types.findIndex((element) => {
			return element.id == type.id;
		});
		this.types[index].description = type.description;
		this.types[index].priority = type.priority;
		return Promise.resolve(type);
	}		
}