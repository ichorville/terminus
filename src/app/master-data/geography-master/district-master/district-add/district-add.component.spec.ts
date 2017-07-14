import { Router } from '@angular/router';
import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../../testing/router-stubs';

import { DistrictAddComponent } from './district-add.component';
import { DistrictMasterService } from '../district-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { CountryMasterService } from '../../country-master/country-master.service';


describe('Component: DistrictAdd', () => {

	let comp: DistrictAddComponent;
	let _cms: any;
    let _rms: any;
	let _dms: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CountryMasterService;
   	    _rms = new StubService as any as RegionMasterService;
	    _dms = new StubService as any as DistrictMasterService;
		comp = new DistrictAddComponent(router, _cms, _rms,_dms);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(4);
	});

	it('should check whether submit works', () => {
		const newParentUid = '10';
		comp.formElements[0].value = newParentUid;

		const newDescription = 'district 1';
		comp.formElements[1].value = newDescription;

		const newId = '1';
		comp.formElements[2].value = newId;

		let newValue: any = {
			'parentUid': comp.formElements[0].value,
			'description': comp.formElements[1].value,
			'id': comp.formElements[2].value
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_dms.district.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	district: any;
	constructor() {
		this.district = [
			{
				id: 2,
				name: "district 1",
				parentUid: '1'
			},
			{
				id: 3,
				name: "district 2",
				parentUid: '2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.district.push(oc);
		return Promise.resolve(oc);
	}
}
