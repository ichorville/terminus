import { Router } from '@angular/router';
import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../../testing/router-stubs';

import { RegionAddComponent } from './region-add.component';
import { RegionMasterService } from '../region-master.service';
import { CountryMasterService } from '../../country-master/country-master.service';


describe('Component: RegionAdd', () => {

	let comp: RegionAddComponent;
	let _cms: any;
  let _rms: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CountryMasterService;
    _rms = new StubService as any as RegionMasterService;
		comp = new RegionAddComponent(router, _cms, _rms);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works', () => {
		const newParentUid = '10';
		comp.formElements[0].value = newParentUid;

		const newDescription = '1';
		comp.formElements[1].value = newDescription;

		const newId = '50';
		comp.formElements[2].value = newId;

		let newValue: any = {
			'parentUid': comp.formElements[0].value,
			'description': comp.formElements[1].value,
			'id': comp.formElements[2].value
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_rms.region.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	region: any;
	constructor() {
		this.region = [
			{
				id: 2,
				name: "region 1",
				parentUid: '1'
			},
			{
				id: 3,
				name: "region 2",
				parentUid: '2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.region.push(oc);
		return Promise.resolve(oc);
	}
}
