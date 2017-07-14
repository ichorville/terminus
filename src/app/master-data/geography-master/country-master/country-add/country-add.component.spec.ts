import { Router } from '@angular/router';
import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../../testing/router-stubs';

import { CountryAddComponent } from './country-add.component';
import { CountryMasterService } from '../country-master.service';

describe('Component: CountryAdd', () => {

	let comp: CountryAddComponent;
	let _cms: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CountryMasterService;
		comp = new CountryAddComponent(router, _cms);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 2 form elements', () => {
		expect(comp.formElements.length).toBe(2);
	});

	it('should check whether submit works', () => {
		const newId = '5';
		comp.formElements[0].value = newId;

		const newName = 'Country 1';
		comp.formElements[1].value = newName;

		let newValue: any = {
			'id': comp.formElements[0].value,
			'name': comp.formElements[1].value			
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_cms.country.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	country: any;
	constructor() {
		this.country = [
			{
				id: 2,
				name: "country 1",
				parentUid: '1'
			},
			{
				id: 3,
				name: "country 2",
				parentUid: '2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.country.push(oc);
		return Promise.resolve(oc);
	}
}
