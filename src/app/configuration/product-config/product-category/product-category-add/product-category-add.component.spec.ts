/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductCategoryAddComponent } from './product-category-add.component';
import { ProductCategoryService } from '../product-category.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: ProductCategoryAdd w/o Angular TestBed', () => {

  	let comp: ProductCategoryAddComponent;
	let _pcs: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

  beforeEach(() => {
		router = new RouterStub as any as Router;
		_pcs = new StubService as any as ProductCategoryService;
		comp = new ProductCategoryAddComponent(router, _pcs);

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {
		const newId = '5';
		comp.formElements[0].value = newId;

		const newDescription = 'Soap';
		comp.formElements[1].value = newDescription;

		const newType = '2';
		comp.formElements[2].value = newType;

		let newCategory: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'categoryType': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newCategory;

		comp.submit(formSubmitEvent);
		expect(_pcs.categories.length).toEqual(3, 'service array has been updated');
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
	
	create(category: any): Promise<any> {
		this.categories.push(category);
		return Promise.resolve(category);
	}		
}
