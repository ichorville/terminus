import {
    Component, OnInit, Output, EventEmitter, state,
    trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { CustomerMasterService } from '../customer-master.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

	customer: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _cms: CustomerMasterService
	) {		
			this.title = 'Edit Customer';
			this.buttonValue = 'Update';
			this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
			this.customer = {};
			this.createForm();
		}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._cms.get(id).then((customer) => {
				this.customer = customer;
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let customer: any = {
			'uid': this.customer['Uid'],              
			'name': formValues.name == '' ? this.customer['Name'] : formValues.name
		};
		this._cms.update(customer).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/customers');
			} else {
				alert('Cannot Update Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'name',
				label: 'Name',
				value: this.customer['Name'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Name'
			})
		];
	}
}
