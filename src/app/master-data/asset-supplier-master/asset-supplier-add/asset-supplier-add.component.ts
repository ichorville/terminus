import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Validators } from '@angular/forms';

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
			'ID': formValues.id,
			'Name': formValues.name,
			'StreetAddress': formValues.address,
			'city': formValues.city,
			'region': formValues.region,
			'postalCode': formValues.postalCode,
			'Telephone1': formValues.telephone1,
			'Telephone2': formValues.telephone2,
			'email': formValues.email,
			'Fax': formValues.fax,
			'notes': formValues.notes,
			'AreaUID': formValues.areaUID,
			'AreaUID1': formValues.areaUID1
		};
		this._asms.create(supplier).then((status) => {
			if (status == 200) {
				this.router.navigateByUrl('/master-data/suppliers');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Supplier ID',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Supplier ID',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'name',
				label: 'Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Name',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'address',
				label: 'Address',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Address'
			}),
			new FormTextbox({
				key: 'city',
				label: 'City',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'City'
			}),
			new FormTextbox({
				key: 'region',
				label: 'Region',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 5,
				placeholder: 'Region'
			}),
			new FormTextbox({
				key: 'postalCode',
				label: 'Postal Code',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 6,
				placeholder: 'Postal Code'
			}),
			new FormTextbox({
				key: 'telephone1',
				label: 'Telephone Number',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 7,
				placeholder: 'Telephone Numner'
			}),
			new FormTextbox({
				key: 'telephone2',
				label: 'Mobile Number',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 8,
				placeholder: 'Mobile Numner'
			}),
			new FormTextbox({
				key: 'email',
				label: 'Email',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 9,
				placeholder: 'Email'
			}),
			new FormTextbox({
				key: 'fax',
				label: 'Fax',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 10,
				placeholder: 'Fax'
			}),
			new FormTextbox({
				key: 'notes',
				label: 'Notes',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 11,
				placeholder: 'Notes'
			}),
			new FormTextbox({
				key: 'areaUID',
				label: 'Area 1',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 12,
				placeholder: 'Area 1'
			}),
			new FormTextbox({
				key: 'areaUID1',
				label: 'Area 2',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 13,
				placeholder: 'Area 2'
			})
		];
	}
}

