import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { ProductGroupService } from '../product-group.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-product-group-add',
	templateUrl: './product-group-add.component.html',
	styleUrls: ['./product-group-add.component.css']
})
export class ProductGroupAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _pgs: ProductGroupService
	) {
		this.title = 'Add Product Group';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productGroup: any = {
			'id': formValues.id,	
			'description': formValues.description,	
			'priority': formValues.priority				
		};

		this._pgs.create(productGroup).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/configuration/products/groups');
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
				placeholder: 'Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'priority',
				label: 'Priority',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority',
				validators: [
					Validators.required,
				]
			})
		]
	}
}
