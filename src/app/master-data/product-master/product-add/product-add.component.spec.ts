/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../testing/router-stubs';

import { ProductAddComponent } from './product-add.component';
import { ProductMasterService } from '../product-master.service';
import { ProductTypeService } from '../../../configuration/product-config/product-type/product-type.service';
import { ProductGroupService } from '../../../configuration/product-config/product-group/product-group.service';

describe('Component: ProductAdd', () => {
	let comp: ProductAddComponent;
	let _pms: any;
	let _pgs:any;
	let _pts: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_pms = new StubService as any as ProductMasterService;
		comp = new ProductAddComponent(router, _pms, _pts, _pgs);
		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 6 form elements', () => {
		expect(comp.formElements.length).toBe(6);
	});

	it('should check whether submit works', () => {
		const newId = '10';
		comp.formElements[0].value = newId;

		const newName = 'product 10';
		comp.formElements[1].value = newName;

		const newDescription = 'Desc 10';
		comp.formElements[2].value = newDescription;

		const newCategory = 'category 10';
		comp.formElements[3].value = newCategory;

		const newType = 'type 10';
		comp.formElements[4].value = newType;

		const newGroup = 'group 10';
		comp.formElements[5].value = newGroup;

		let newValue: any = {
			'id': comp.formElements[0].value,
			'name': comp.formElements[1].value,
			'description': comp.formElements[2].value,
			'productCategory': comp.formElements[3].value,
			'productType': comp.formElements[4].value,   
			'productGroup': comp.formElements[5].value
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_pms.product.length).toEqual(3, 'service array has  not been updated');
	});
});

class StubService {
	product: any;
	constructor() {
		this.product = [
			{
				id: 1,
				name: "product 1",
				description: 'desc 1',
				productCategory: 'category 7',
				productType: 'type 1',
				productGroup: 'group 1'
			},
			{
				id: 2,
				name: "product 2",
				description: 'desc 2',
				productCategory: 'category 6',
				productType: 'product 2',
				productGroup: 'group 2'
			}
		];
	}
	create(oc: any): Promise<any> {
		this.product.push(oc);
		return Promise.resolve(oc);
	}
}