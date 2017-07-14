/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { RouterStub, ActivatedRoute, 
	ActivatedRouteStub } from '../../../../testing/router-stubs';

import { OutletEditComponent } from './outlet-edit.component';
import { OutletMasterService } from '../outlet-master.service';
import { OutletClassService } from '../../../configuration/outlet-config/outlet-class/outlet-class.service';
import { TownMasterService } from '../../../master-data/geography-master/town-master/town-master.service';
import { DistrictMasterService } from '../../../master-data/geography-master/district-master/district-master.service';
import { RegionMasterService } from '../../../master-data/geography-master/region-master/region-master.service';
import { CountryMasterService } from '../../../master-data/geography-master/country-master/country-master.service';
import { CustomerMasterService } from '../../../master-data/customer-master/customer-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

describe('Component: OutletEdit w/o Angular TestBed', () => {

	let comp: OutletEditComponent;
	let _oms: any;
	let _ocs: any;
	let _tms: any;
	let _dms: any;
	let _rms: any;
	let _cms: any;
	let _cs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_oms = new StubService as any as OutletMasterService;
		comp = new OutletEditComponent(router, activatedRoute, _oms, _ocs,_tms,_dms,_rms,_cms,_cs);

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 15 form elements', () => {
		expect(comp.formElements.length).toBe(15);
	});

	it('should check whether submit works',()=> {

		const newId = 'outlet_1';
		comp.formElements[0].value = newId;
		
		const newName = 'Felspar';
		comp.formElements[1].value = newName;

		let newOutlet: any = {
			'uid': 6,
			'outletId': comp.formElements[0].value,	
			'name': comp.formElements[1].value,
		};
		formSubmitEvent.formObject = newOutlet;

		comp.submit(formSubmitEvent);
		expect(_oms.outlets[0].id).toEqual(newOutlet.outletId, 'existing outlet id has not been updated');
		expect(_oms.outlets[0].name).toEqual(newOutlet.name, 'existing outlet name has not been updated');
	});
});

class StubService {
	outlets: any;
	
	constructor() {
		this.outlets = [
			{
				uid: 6,
				id: "Id 11",
				name: "Thenuwara",
			},
			{
				uid: 7,
				id: "Id 12",
				name: "Thenuwara",
			}
		];
	}
	
	update(outlet: any): Promise<any> {
		outlet.uid = 6;
		let index = this.outlets.findIndex((element) => {
			return element.uid == outlet.uid;
		});
		this.outlets[index].id = outlet.id;
		this.outlets[index].name = outlet.name;
		return Promise.resolve(outlet);
	}	
}