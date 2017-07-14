import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { ProductCategoryService } from '../product-category.service';

@Component({
	selector: 'app-product-category-add',
	templateUrl: './product-category-add.component.html',
	styleUrls: ['./product-category-add.component.css']
})
export class ProductCategoryAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _pcs: ProductCategoryService
	) { 
		this.title = 'Add Product Category';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productCategory: any = {
			//'id': formValues.id,	
			'description': formValues.description,	
			'categoryType': formValues.categoryType,
			'parentUid': formValues.parentUid			
		};
		this._pcs.create(productCategory).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/configuration/products/categories');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description'
			}),
			new FormTextbox({
				key: 'categoryType',
				label: 'Category Type',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Category Type'
			}),
			new FormTextbox({
				key: 'parentUid',
				label: 'Parent Uid',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Parent Uid'
			})
		];
	}
}
