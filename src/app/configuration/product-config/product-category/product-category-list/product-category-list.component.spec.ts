/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductCategoryListComponent } from './product-category-list.component';
import { ProductCategoryService } from '../product-category.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: ProductCategoryList w/o Angular TestBed', () => {

    let comp: ProductCategoryListComponent;
	let _pcs: any;

	beforeEach(() => {
		_pcs = new StubService as any as ProductCategoryService;
		comp = new ProductCategoryListComponent(_pcs);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the product-category-list', () => {
		expect(comp.columns[0].name).toBe('Category Id');
		expect(comp.columns[0].attr).toBe('categoryId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Category Type');
		expect(comp.columns[2].attr).toBe('categoryType');;

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	categories: any;
	
	constructor() {
		this.categories = [
			{
				id: 2,
				description: "Category 1",
				categoryType: '1'
			},
			{
				id: 3,
				description: "Category 2",
				categoryType: '2'
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.categories);
	}
}