/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductGroupAddComponent } from './product-group-add.component';
import { ProductGroupService } from '../product-group.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: ProductGroupAdd w/o Angular TestBed', () => {

	let comp: ProductGroupAddComponent;
	let _pgs: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pgs = new StubService as any as ProductGroupService;
		comp = new ProductGroupAddComponent(router, _pgs);

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

		let newGroup: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newGroup;

		comp.submit(formSubmitEvent);
		expect(_pgs.groups.length).toEqual(3, 'service array has been updated');
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
	
	create(group: any): Promise<any> {
		this.groups.push(group);
		return Promise.resolve(group);
	}		
}