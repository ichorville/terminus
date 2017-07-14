/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductGroupEditComponent } from './product-group-edit.component';
import { ProductGroupService } from '../product-group.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: ProductGroupEdit w/o Angular TestBed', () => {

	let comp: ProductGroupEditComponent;
	let _pgs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pgs = new StubService as any as ProductGroupService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new ProductGroupEditComponent(router, activatedRoute, _pgs);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _pgs.groups[1].id;
		comp.formElements[1].value = _pgs.groups[1].description;
		comp.formElements[2].value = _pgs.groups[1].priority;

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
		expect(_pgs.groups[1].description).toEqual(newType.description, 'exhisting productType description has been updated');
		expect(_pgs.groups[1].priority).toEqual(newType.priority, 'exhisting productType priority has been updated');
	});
});

class StubService {
	groups: any;
	
	constructor() {
		this.groups = [
			{
				id: 2,
				description: "group 1",
				priority: '1'
			},
			{
				id: 3,
				description: "group 2",
				priority: '2'
			}
		];
	}
	
	update(group: any): Promise<any> {
		let index = this.groups.findIndex((element) => {
			return element.id == group.id;
		});
		this.groups[index].description = group.description;
		this.groups[index].priority = group.priority;
		return Promise.resolve(group);
	}		
}