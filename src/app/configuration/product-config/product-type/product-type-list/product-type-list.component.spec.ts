/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductTypeListComponent } from './product-type-list.component';
import { ProductTypeService } from '../product-type.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: ProductTypeList w/o Angular TestBed', () => {

	let comp: ProductTypeListComponent;
	let _pts: any;

	beforeEach(() => {
		_pts = new StubService as any as ProductTypeService;
		comp = new ProductTypeListComponent(_pts);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the product-type-list', () => {
		expect(comp.columns[0].name).toBe('Product Type Id');
		expect(comp.columns[0].attr).toBe('typeId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Priotiry');
		expect(comp.columns[2].attr).toBe('priority');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	types: any;
	
	constructor() {
		this.types = [
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
		return Promise.resolve(this.types);
	}
}