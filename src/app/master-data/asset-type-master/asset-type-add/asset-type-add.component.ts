// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-asset-type-add',
//   templateUrl: './asset-type-add.component.html',
//   styleUrls: ['./asset-type-add.component.css']
// })
// export class AssetTypeAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import {Component, OnInit, Output, EventEmitter, state,
	 				trigger, style, transition, animate} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

//import { CustomerMasterService } from '../customer-master.service';


@Component({
  selector: 'app-asset-type-add',
  templateUrl: './asset-type-add.component.html',
  styleUrls: ['./asset-type-add.component.css']
})
export class AssetTypeAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	gridState: string;
	messageCssClass: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
	//	private _cms: CustomerMasterService
	) {
		this.title = 'Add type';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let customer: any = {
			'name': formValues.Name
		};
	
		//this._cms.create(customer).then((status) => {
		// 	if(status == 200) {
		// 		this.router.navigateByUrl('/master-data/customers');
		// 	} else {
		// 		alert('Cannot Add Due to Error');
		// 	}
		// });
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'supplierId',
				label: 'ID',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'ID'
			}),

			new FormTextbox({
				key: 'Name',
				label: 'Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Name'
			}),

		]
	}
}

