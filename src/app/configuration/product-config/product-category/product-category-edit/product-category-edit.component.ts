import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { ProductCategoryService } from '../product-category.service';

@Component({
	selector: 'app-product-category-edit',
	templateUrl: './product-category-edit.component.html',
	styleUrls: ['./product-category-edit.component.css']
})
export class ProductCategoryEditComponent implements OnInit {

	productCategory: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _pcs: ProductCategoryService
	) { 
		this.title = 'Edit Product Category';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.productCategory = {};
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._pcs.get(id).then((productCategory) => {
				this.productCategory = productCategory['t'][0];
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productCategory: any = {
			'uid': this.productCategory.UID,
			'id': formValues.id == '' ? this.productCategory['ID'] : formValues.id,	
			'description': formValues.description == '' ? this.productCategory['Description'] : formValues.description,	
			'categoryType': formValues.categoryType	== '' ? this.productCategory['CategoryType'] : formValues.categoryType,
			'parentUid': formValues.parentUid	== '' ? this.productCategory['parentUID'] : formValues.categoryType	
		};

		this._pcs.update(productCategory).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/configuration/products/categories');
			} else {
				alert('Cannot Update Due to Error');
			}
		});	
	}

	private createForm() {
		this.formElements = [
		/*	new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.productCategory['ID'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Id'
			}),       */
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: this.productCategory['Description'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Description',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'categoryType',
				label: 'Category Type',
				value: this.productCategory['CategoryType'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Category Type',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'parentUid',
				label: 'Parent Uid',
				value: this.productCategory['ParentUID'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Parent Uid',
				validators: [
					Validators.required,
				]
			})		
		];
	}
}
