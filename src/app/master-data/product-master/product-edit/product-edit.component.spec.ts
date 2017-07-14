/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
	ActivatedRouteStub } from '../../../../testing/router-stubs';

import { ProductEditComponent } from './product-edit.component';
import { ProductMasterService } from '../product-master.service';


describe('Component: ProductEdit', () => {
	
	let comp: ProductEditComponent;
	let _pms: any;
	let _pts:any;
	let _pgs: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(()=>{
		router = new RouterStub as any as Router;
		_pms = new StubService as any as ProductMasterService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new ProductEditComponent(router, activatedRoute, _pms,_pts, _pgs);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _pms.product[1].id;
		comp.formElements[1].value = _pms.product[1].name;
		comp.formElements[2].value = _pms.product[1].description;

		formSubmitEvent = new FormSubmitEvent();		
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should check whether submit works',()=> {

		const newId = '10';
		comp.formElements[0].value = newId;

		const newName = 'product 10';
		comp.formElements[1].value = newName;

		const newDescription = 'desc 10';
		comp.formElements[2].value = newDescription;

		let newProduct: any = {
			'uid': 1,
			'id': comp.formElements[0].value,	
			'name': comp.formElements[1].value,
			'description': comp.formElements[2].value
		};

		formSubmitEvent.formObject = newProduct;

		comp.submit(formSubmitEvent);
		expect(_pms.product[1].id).toEqual(newProduct.itemId, 'existing product id has not been updated');
		expect(_pms.product[1].name).toEqual(newProduct.itemName, 'existing product name has not been updated');
		expect(_pms.product[1].description).toEqual(newProduct.description, 'existing product description has been updated');
	});
});

class StubService {
	product: any;
	constructor() {
		this.product = [
			{
				uid: 1,
				id: 1,
				name: "product 1",
				description: 'desc 1',
			},
			{	
				uid: 2,
				id: 2,
				name: "product 2",
				description: 'desc 2',
			}
		];
	}
	
	update(product: any): Promise<any> {
		product.uid = 2;
		let index = this.product.findIndex((element) => {
			return element.uid == product.uid;
		});
		this.product[index].id = product.id;
		this.product[index].name = product.name;
		this.product[index].description = product.description;
		return Promise.resolve(product);
	}
}