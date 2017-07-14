/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { ProductCategoryEditComponent } from './product-category-edit.component';
import { ProductCategoryService } from '../product-category.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: ProductCategoryEdit w/o Angular TestBed', () => {

	let comp: ProductCategoryEditComponent;
	let _pcs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pcs = new StubService as any as ProductCategoryService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new ProductCategoryEditComponent(router, activatedRoute, _pcs);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _pcs.categories[1].id;
		comp.formElements[1].value = _pcs.categories[1].description;
		comp.formElements[2].value = _pcs.categories[1].priority;

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newDescription = 'Paper';
		comp.formElements[1].value = newDescription;

		const newType = '2';
		comp.formElements[2].value = newType;

		let newCategory: any = {
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};

		formSubmitEvent.formObject = newCategory;

		comp.submit(formSubmitEvent);
		expect(_pcs.categories[1].description).toEqual(newCategory.description, 'exhisting ProductCategory description has been updated');
		expect(_pcs.categories[1].categoryType).toEqual(newCategory.categoryType, 'exhisting ProductCategory categoryType has been updated');
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
	
	update(category: any): Promise<any> {
		let index = this.categories.findIndex((element) => {
			return element.id == category.id;
		});
		this.categories[index].description = category.description;
		this.categories[index].categoryType = category.categoryType;
		return Promise.resolve(category);
	}		
}
