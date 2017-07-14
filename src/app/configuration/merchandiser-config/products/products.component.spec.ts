/* tslint:disable:no-unused-variable */

import {
	ComponentFixture, TestBed,
	async, inject, fakeAsync, tick
} from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

import { ProductsComponent } from './products.component';
import { MerchandiserConfigService } from '../merchandiser-config.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { ProductMasterService } from '../../../master-data/product-master/product-master.service';

describe('Component: ProductsComponent', () => {

	let comp: ProductsComponent;
	let _mcs: any;
	let _mms: any;
	let _pms: any;

	beforeEach(() => {
		_mcs = new StubService3 as any as MerchandiserConfigService;
		_mms = new StubService2 as any as MerchandiserMasterService;
		_pms = new StubService1 as any as ProductMasterService;
		comp = new ProductsComponent(_mcs, _mms, _pms);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the products', () => {

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

	it('should assign new products', () => {

		const selectedMerchandiser = '1021';
		const products = [2, 3];

		comp.selectedMerchandiser.uid = selectedMerchandiser;
		comp.selectedMerchandiserProductUids = products;
		comp.save();
		expect(_mcs.selectedMerchandiser[0]).toBe(products[0]);
		expect(_mcs.selectedMerchandiser[1]).toBe(products[1]);

	});
});

class StubService1 {
	products: any;

	constructor() {
		this.products = [
			{
				uid: 2,
				id: 2,
				name: "MILO 3in1",
				description: "des 1 ",
				expiryDate: "null",
				type: "TYPE a",
				groupData: "GROUPD",
				category: "HFD"
			},
			{
				uid: 3,
				id: 3,
				name: "MILO 3in1",
				description: "des 3 ",
				expiryDate: "null",
				type: "TYPE a",
				groupData: "GROUPD",
				category: "HFD"
			},
			{
				uid: 4,
				id: "MILO06",
				name: "MILO® Powder 400g",
				description: "des 4 ",
				minOrderQty: 0,
				expiryDate: "null",
				type: "TYPE a",
				groupData: "GROUPD",
				category: "HFD"
			}

		];
	}

	all(): Promise<any> {
		return Promise.resolve(this.products);
	}
}

class StubService2 {
	merchandiser: any;

	constructor() {
		this.merchandiser = [
			{
				uid: 1021,
				name: "Cynthia Tan"
			},
			{
				uid: 1018,
				name: "David Lew"
			},
			{
				uid: 1022,
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

	assignProducts(products: any): Promise<any> {
		this.selectedMerchandiser = products.products;
		return Promise.resolve(this.selectedMerchandiser);
	}
}





