/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletTypeEditComponent } from './outlet-type-edit.component';
import { OutletTypeService } from '../outlet-type.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: OutletTypeEdit w/o Angular TestBed', () => {

	let comp: OutletTypeEditComponent;
	let _ocs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_ocs = new StubService as any as OutletTypeService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new OutletTypeEditComponent(router, activatedRoute, _ocs);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _ocs.types[1].id;
		comp.formElements[1].value = _ocs.types[1].description;

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 2 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newDescription = 'Paper';
		comp.formElements[1].value = newDescription;

		let newType: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,
			'priority': comp.formElements[2].value	
		};

		formSubmitEvent.formObject = newType;

		comp.submit(formSubmitEvent);
		expect(_ocs.types[1].description).toEqual(newType.description, 'exhisting productType description has been updated');
	});
});

class StubService {
	types: any;
	
	constructor() {
		this.types = [
			{
				id: 2,
				description: "type 1"
			},
			{
				id: 3,
				description: "type 2"
			}
		];
	}
	
	update(outletType: any): Promise<any> {
		let index = this.types.findIndex((element) => {
			return element.id == outletType.id;
		});
		this.types[index].description = outletType.description;
		return Promise.resolve(outletType);
	}		
}