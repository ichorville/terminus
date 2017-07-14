import { Router } from '@angular/router';
import {ComponentFixture, TestBed,
	          async, inject, fakeAsync, tick} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../../testing/router-stubs';

import { StoreLocationsAddComponent } from './store-Locations-add.component';
import { StoreLocationsService } from '../Locations.service';

describe('Component: StoreLocationAdd', () => {

	let comp: StoreLocationsAddComponent;
	let _sas: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_sas = new StubService as any as StoreLocationsService;
		comp = new StoreLocationsAddComponent(router, _sas);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works', () => {
		const newId = '5';
		comp.formElements[0].value = newId;

		const newDescription = 'Des 5';
		comp.formElements[1].value = newDescription;

		const newPriority = '2';
		comp.formElements[2].value = newPriority;

		let newValue: any = {
			'id': comp.formElements[0].value,
			'description': comp.formElements[1].value,
			'priority': comp.formElements[2].value
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_sas.storeLocation.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	storeLocation: any;
	constructor() {
		this.storeLocation = [
			{
				id: 2,
				description: "des 1",
				priority: '1'
			},
			{
				id: 3,
				description: "des 2",
				priority: '2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.storeLocation.push(oc);
		return Promise.resolve(oc);
	}
}
