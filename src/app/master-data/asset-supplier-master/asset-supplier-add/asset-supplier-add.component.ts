import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetSupplierMasterService } from '../asset-supplier-master.service';
import { LoginVariable } from '../../../global';

import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-supplier-add',
	templateUrl: './asset-supplier-add.component.html',
	styleUrls: ['./asset-supplier-add.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetSupplierAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _asms: AssetSupplierMasterService
	) {
		this.title = 'Add Supplier';
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
		let supplier: any = {
			// add necessary attributes
		};
		this._asms.create(supplier).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/suppliers');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'supplierId',
				label: 'Supplier ID',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Supplier ID'
			}),
			new FormTextbox({
				key: 'Name',
				label: 'Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Name'
			}),
			new FormTextbox({
				key: 'Address',
				label: 'Address',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Address'
			}),
			new FormTextbox({
				key: 'RefferenceId',
				label: 'Refference ID',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'Refference ID'
			})
		];
	}
}

