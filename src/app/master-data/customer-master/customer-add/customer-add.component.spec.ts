/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { TestBed, async, ComponentFixture, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../testing/router-stubs';

import { CustomerAddComponent } from './customer-add.component';
import { CustomerMasterService } from '../customer-master.service';


describe('Component: CustomerAdd', () => {

	let comp: CustomerAddComponent;
	let _cms: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		_cms = new stubService as any as CustomerMasterService;
		router = new RouterStub as any as Router;
		comp = new CustomerAddComponent(router, _cms);
		formSubmitEvent = new FormSubmitEvent;
	});

	it('should have one form element', () => {
		expect(comp.formElements.length).toBe(1);
	});

	it('should check whether submit works', () => {

		const newName = "Name1";
		comp.formElements[0].value = newName;

		let newValue: any = {
			'name': comp.formElements[0].value,
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_cms.customer.length).toEqual(3, 'service array has been updated');
	});
});

class stubService {
		customer: any;
		constructor() {
			this.customer = [
				{
					name: "name2",
				},
				{
					name: "name3",
				}
			];
		}

		create(oc: any): Promise<any> {
			this.customer.push(oc);
			return Promise.resolve(oc);
		}
}

