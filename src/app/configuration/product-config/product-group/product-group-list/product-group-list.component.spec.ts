/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductGroupListComponent } from './product-group-list.component';
import { ProductGroupService } from '../product-group.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: ProductGroupList w/o Angular TestBed', () => {

	let comp: ProductGroupListComponent;
	let _pgs: any;

	beforeEach(() => {
		_pgs = new StubService as any as ProductGroupService;
		comp = new ProductGroupListComponent(_pgs);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the product-group-list', () => {
		expect(comp.columns[0].name).toBe('Product Group Id');
		expect(comp.columns[0].attr).toBe('productId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Priotiry');
		expect(comp.columns[2].attr).toBe('priority');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	groups: any;
	
	constructor() {
		this.groups = [
			{
				id: 2,
				description: "type 1"
			},
			{
				id: 3,
				description: "type 2"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.groups);
	}
}