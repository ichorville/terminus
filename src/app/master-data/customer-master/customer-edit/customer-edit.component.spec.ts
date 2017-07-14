/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { CustomerEditComponent } from './customer-edit.component';
import { CustomerMasterService } from '../customer-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  	ActivatedRouteStub } from '../../../../testing/router-stubs';

describe('Component: CustomerEdit', () => {

	let comp: CustomerEditComponent;
	let _cms : any;  
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent : FormSubmitEvent;

	beforeEach(()=>{
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CustomerMasterService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new CustomerEditComponent(router,activatedRoute, _cms);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _cms.customer[1].Name;

		formSubmitEvent = new FormSubmitEvent();
	});
	it('should have 1 form element', () => {
		expect(comp.formElements.length).toBe(1);
	});

	it('should check whether submit works',()=> {

		const newName = 'Name 5';
		comp.formElements[0].value = newName;

		let newValue: any = {
			'uid': 1,	
			'name': comp.formElements[0].value,
		};
		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_cms.customer[0].Name).toEqual(newValue.Name, 'exhisting customer name has been updated');
	});
});


class StubService {
	customer: any;
	
	constructor() {
		this.customer = [
			{
				uid: "1",
				name: "Name 1"
			},
			{
				uid: "2",
				name: "Name 2"
			}
		];
	}
	
	update(customer: any): Promise<any> {
		customer.Uid = 1;
		let index = this.customer.findIndex((element) => {
			return element.uid == customer.Uid;
		});
		this.customer[index].name = customer.Name;
		return Promise.resolve(customer);
	}		
}