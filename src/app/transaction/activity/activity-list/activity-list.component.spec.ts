/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../testing/router-stubs';
import { Router } from '@angular/router';

import { ActivityService } from '../activity.service';
import { OutletMasterService } from '../../../master-data/outlet-master/outlet-master.service';
import { CustomerMasterService } from '../../../master-data/customer-master/customer-master.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { ProductMasterService } from '../../../master-data/product-master/product-master.service';
import { StoreActivitiesService } from '../../../configuration/store-config/activities/activities.service';
import { StoreLocationsService } from '../../../configuration/store-config/locations/locations.service';
import { ProductCategoryService } from '../../../configuration/product-config/product-category/product-category.service';
import { ActivityListComponent } from './activity-list.component';

describe('ActivityListComponent', () => {
	let comp: ActivityListComponent;
	let _ss: any;
	let _oms: any;
	let _cms:any;
	let _mms:any;
	let _pms: any;
	let _sas: any;
	let _sls: any;
	let _pcs:any

	beforeEach(() => {
		_ss = new StubService as any as ActivityService;
		_oms = new StubService as any as OutletMasterService;
		_cms = new StubService as any as CustomerMasterService;
		_mms = new StubService as any as MerchandiserMasterService;
		_pms = new StubService as any as ProductMasterService;
		_sas = new StubService as any as StoreActivitiesService;
		_sls = new StubService as any as StoreLocationsService;
		_pcs = new StubService as any as ProductCategoryService;
		comp = new ActivityListComponent(_ss,_oms,_cms,_mms,_pms,_sas,_sls,_pcs);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
		
	it('should fetch the Activity list', () => {
	
		expect(comp.columns[0].name).toBe('ID');
		expect(comp.columns[0].attr).toBe('callId');

		expect(comp.columns[1].name).toBe('Start');
		expect(comp.columns[1].attr).toBe('start');

		expect(comp.columns[2].name).toBe('End');
		expect(comp.columns[2].attr).toBe('end');

		expect(comp.columns[3].name).toBe('Outlet');
		expect(comp.columns[3].attr).toBe('outlet');

 		expect(comp.columns[4].name).toBe('Merchandiser');
		expect(comp.columns[4].attr).toBe('merchandiser');

		expect(comp.columns[5].name).toBe('Brand');
		expect(comp.columns[5].attr).toBe('brand');   

		expect(comp.columns[6].name).toBe('Category');
		expect(comp.columns[6].attr).toBe('category'); 

		expect(comp.columns[7].name).toBe('Product');
		expect(comp.columns[7].attr).toBe('product'); 

		expect(comp.columns[8].name).toBe('Store Activity');
		expect(comp.columns[8].attr).toBe('activity'); 

		expect(comp.columns[9].name).toBe('Store Location');
		expect(comp.columns[9].attr).toBe('location'); 

		expect(comp.columns.length).toBe(10);
	});
});

class StubService {
	activity: any;
	
	constructor() {
		this.activity = [
			{
					key: "      1410|        53",
					callId: "C0006/1481799082937",
					outlet: "Walukarama FG",
					agent: "Michael Tan",
					scheduledStart: "2016-12-15T16:21:23",
					scheduledEnd: "2016-12-15T16:21:44",
					brand: "MILO",
					category: "HFD",
					item: "MILO 3in1",
					activity: "MILO Cooler Display",
					storeLocation: "Pallet Display",
					captureType: 0,
					fileName: "ImageFiles/6_1481799103997.jpg",
					fileName2: "ImageFiles/6_1481799103997.jpg"
			},
			{
					key: "      1409|        52",
					callId: "C0006/1481775837464",
					outlet: "7E - BLK 4 LEVEL 1",
					agent: "Michael Tan",
					scheduledStart: "2016-12-15T09:53:57",
					scheduledEnd: "2016-12-15T09:55:17",
					brand: "NESCAFE",
					category: "COFFEE",
					item: "NESCAFE® Gold 200g",
					activity: "Barista Coffee Machine Demo1",
					storeLocation: "Chiller Display",
					captureType: 0,
					fileName: "ImageFiles/6_1481775917118.jpg",
					fileName2: "ImageFiles/6_1481775917118.jpg"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.activity);
	}
}
