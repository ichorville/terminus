/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductMasterService } from '../product-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

describe('Component: ProductList', () => {

	let comp: ProductListComponent;
	let _pms: any;

	beforeEach(() => {
		_pms = new StubService as any as ProductMasterService;
		comp = new ProductListComponent(_pms);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the products list', () => {
	
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('productId');

		expect(comp.columns[1].name).toBe('Name');
		expect(comp.columns[1].attr).toBe('name');

		expect(comp.columns[2].name).toBe('Description');
		expect(comp.columns[2].attr).toBe('description');;

		expect(comp.columns[3].name).toBe('Category');
		expect(comp.columns[3].attr).toBe('category');;

		expect(comp.columns[4].name).toBe('Group');
		expect(comp.columns[4].attr).toBe('group');;

		expect(comp.columns[5].name).toBe('Type');
		expect(comp.columns[5].attr).toBe('type');;

		expect(comp.columns.length).toBe(6);
	});
});

class StubService {
	products: any;
	
	constructor() {
		this.products = {
			"t": [
					{
						"Uid": 2,
						"Id": "MILO01",
						"Name": "MILO® 3in1 Original",
						"Description": "MILO 3in1",
						"ExpiryDate": "2017-02-09T15:39:53.643",
						"Type": "TYPE a",
						"GroupData": "GROUPD",
						"Category": "HFD"
					},
					{
						"Uid": 3,
						"Id": "MILO02",
						"Name": "MILO® Powder 900g",
						"Description": "MILO 900g",
						"ExpiryDate": null,
						"Type": "TYPE a",
						"GroupData": "GROUPD",
						"Category": "HFD"
					}
				]
			};
		}

	all(): Promise<any> {
		return Promise.resolve(this.products);
	}
}