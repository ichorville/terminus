/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { CountryEditComponent } from './country-edit.component';
import { CountryMasterService } from '../country-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  	ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: CountryEdit', () => {

	let comp: CountryEditComponent;
	let _cms: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(async(() => { 
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CountryMasterService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new CountryEditComponent(router, activatedRoute, _cms);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _cms.country[0].id;
		comp.formElements[1].value = _cms.country[0].description;
		formSubmitEvent = new FormSubmitEvent();
	}));

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should have 2 form elements', () => {
		expect(comp.formElements.length).toBe(2);
	});

	it('should check whether submit works', () => {

		const newId = '4';
		comp.formElements[0].value = newId;

		const newDescription = 'Country 4';
		comp.formElements[1].value = newDescription;

		let newValue: any = {
			'uid': 1,
			'id': comp.formElements[0].value,
			'description': comp.formElements[1].value,
		};
		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_cms.country[0].id).toEqual(newValue.id, 'existing country id has been updated');
		expect(_cms.country[0].description).toEqual(newValue.description, 'existing country name has been updated');
	});
});

class StubService {
	country: any;

	constructor() {
		this.country = [
			{
				uid: 1,
				id: '1',
				description: "country 1 "
			},
			{
				uid: 2,
				id: '2',
				description: "country 2"
			}
		];
	}

	update(country: any): Promise<any> {
		country.uid = 1;
		// uid is set hence component method doesnt pass Uid
		let index = this.country.findIndex((element) => {
			return element.uid == country.uid;
		});
		console.log(index);
		this.country[index].id = country.id;
		this.country[index].description = country.description;
		return Promise.resolve(country);
	}
}