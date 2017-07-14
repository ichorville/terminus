import { Router } from '@angular/router';
import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../../testing/router-stubs';

import { TownAddComponent } from './town-add.component';
import { TownMasterService } from '../town-master.service';
import { DistrictMasterService } from '../../district-master/district-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { CountryMasterService } from '../../country-master/country-master.service';


describe('Component: TownAdd', () => {

	let comp: TownAddComponent;
	let _cms: any;
	let _rms: any;
	let _dms: any;
	let _tms: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_cms = new StubService as any as CountryMasterService;
		_rms = new StubService as any as RegionMasterService;
		_dms = new StubService as any as DistrictMasterService;
		_tms = new StubService as any as TownMasterService;
		comp = new TownAddComponent(router, _cms, _rms,_dms, _tms);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(5);
	});

	it('should check whether submit works', () => {
		const newParentUid = '10';
		comp.formElements[0].value = newParentUid;

		const newDescription = 'town 1';
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
		expect(_tms.town.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	town: any;
	constructor() {
		this.town = [
			{
				id: 2,
				name: "town 1",
				parentUid: '1'
			},
			{
				id: 3,
				name: "town 2",
				parentUid: '2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.town.push(oc);
		return Promise.resolve(oc);
	}
}
