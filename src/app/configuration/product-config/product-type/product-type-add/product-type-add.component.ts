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

import { ProductTypeService } from '../product-type.service';

@Component({
	selector: 'app-product-type-add',
	templateUrl: './product-type-add.component.html',
	styleUrls: ['./product-type-add.component.css']
})
export class ProductTypeAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _pts: ProductTypeService
	) {
		this.title = 'Add Product Type';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {

	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productType: any = {
			'id': formValues.id,	
			'description': formValues.description,	
			'priority': formValues.priority		
		};

		this._pts.create(productType).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/configuration/products/types');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Id'
			}),
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
				key: 'priority',
				label: 'Priority',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority'
			})
		]
	}
}