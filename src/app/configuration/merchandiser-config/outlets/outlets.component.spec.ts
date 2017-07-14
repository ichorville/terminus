/* tslint:disable:no-unused-variable */

import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

import { OutletsComponent } from './outlets.component';
import { MerchandiserConfigService } from '../merchandiser-config.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { OutletMasterService } from '../../../master-data/outlet-master/outlet-master.service';

describe('Component: ProductsComponent', () => {

	let comp: OutletsComponent;
	let _mcs: any;
	let _mms: any;
	let _oms: any;

	beforeEach(() => {
		_mcs = new StubService3 as any as MerchandiserConfigService;
		_mms = new StubService2 as any as MerchandiserMasterService;
		_oms = new StubService1 as any as OutletMasterService;
		comp = new OutletsComponent(_mcs, _mms, _oms);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the outlets', () => {

		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('id');

		expect(comp.columns[1].name).toBe('Name');
		expect(comp.columns[1].attr).toBe('name');

		expect(comp.columns.length).toBe(2);
	});

	it('should fetch the merchandisers', () => {
		comp.merchandiserOptions = [
			{
				key: "1021",
				value: "Cynthia Tan"
			},
			{
				key: "1018",
				value: "David Lew"
			},
			{
				key: "1022",
				value: "Desmond Koh"
			}
		];
		expect(_mms.merchandiser.length).toBe(comp.merchandiserOptions.length);
	});

	it('should assign new outlets', () => {

		const selectedMerchandiser = '1021';
		const outlets = [2, 3];

		comp.selectedMerchandiser.uid = selectedMerchandiser;
		comp.selectedMerchandiserOutletUids = outlets;
		comp.save();
		expect(_mcs.selectedMerchandiser[0]).toBe(outlets[0]);
		expect(_mcs.selectedMerchandiser[1]).toBe(outlets[1]);

	});
});

class StubService1 {
	outlets: any;

	constructor() {
		this.outlets = [
			{
				uid: 40,
				id: 15,
				name: "7E - BAY FRONT AVENUE",
				customerUid: 5,
			},
			{
				uid: 41,
				id: 16,
				name: "7E - BAY FRONT AVENUE",
				customerUid: 5,
			}

		];
	}

	all(): Promise<any> {
		return Promise.resolve(this.outlets);
	}
}

class StubService2 {
	merchandiser: any;

	constructor() {
		this.merchandiser = [
			{
				uID: 1021,
				name: "Cynthia Tan"
			},
			{
				uID: 1018,
				name: "David Lew"
			},
			{
				uID: 1022,
				name: "Desmond Koh"
			}
		];
	}

	all(): Promise<any> {
		return Promise.resolve(this.merchandiser);
	}
}

class StubService3 {
	selectedMerchandiser: any;

	constructor() {
		this.selectedMerchandiser = [
			3, 4
		];
	}

	assignOutlets(outlets: any): Promise<any> {
		this.selectedMerchandiser = outlets.outlets;
		return Promise.resolve(this.selectedMerchandiser);
	}
}