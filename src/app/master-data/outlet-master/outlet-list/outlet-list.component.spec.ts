/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { OutletListComponent } from './outlet-list.component';
import { OutletMasterService } from '../outlet-master.service';
import { CustomerMasterService } from '../../../master-data/customer-master/customer-master.service';
import { OutletClassService } from '../../../configuration/outlet-config/outlet-class/outlet-class.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

describe('Component: OutletList w/o Angular TestBed', () => {

  	let comp: OutletListComponent;
	let _oms: any;
	let _cms: any;
	let _ocs: any;

	beforeEach(() => {
		_oms = new StubService as any as OutletMasterService;
		comp = new OutletListComponent(_oms, _cms, _ocs);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the outlet-list', () => {
		expect(comp.columns[0].name).toBe('Outlet Id');
		expect(comp.columns[0].attr).toBe('outletId');

		expect(comp.columns[1].name).toBe('Name');
		expect(comp.columns[1].attr).toBe('name');

		expect(comp.columns[2].name).toBe('Visit Frequency');
		expect(comp.columns[2].attr).toBe('visitFrequency');

		expect(comp.columns[3].name).toBe('Street Address');
		expect(comp.columns[3].attr).toBe('streetAddress');

		expect(comp.columns[4].name).toBe('City');
		expect(comp.columns[4].attr).toBe('city');

		expect(comp.columns[5].name).toBe('Class');
		expect(comp.columns[5].attr).toBe('class');

		expect(comp.columns.length).toBe(6);
	});
}); 

class StubService {
	outlets: any;
	
	constructor() {
		this.outlets = {
			't': [	
				{
					uid: 6,
					id: 'Id 1',
					employee: 'Thenuwara The',
					designationType: '1',
					userName: null,
					manager: null,
					email: null
				},
				{
					uid: 7,
					id: 'Id 2',
					employee: 'Thenuwara The',
					designationType: '1',
					userName: null,
					manager: null,
					email: null
				}
			]
		};
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.outlets);
	}
}