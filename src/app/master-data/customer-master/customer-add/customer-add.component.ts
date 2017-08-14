import {Component, OnInit, Output, EventEmitter, state,
	 				trigger, style, transition, animate} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { CustomerMasterService } from '../customer-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-customer-add',
	templateUrl: './customer-add.component.html',
	styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	gridState: string;
	messageCssClass: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _cms: CustomerMasterService
	) {
		this.title = 'Add Customer';
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
		let customer: any = {
			'name': formValues.Name
		};
	
		this._cms.create(customer).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/customers');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'Name',
				label: 'Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Name',
				validators: [
					Validators.required,
				]
			})
		]
	}
}
