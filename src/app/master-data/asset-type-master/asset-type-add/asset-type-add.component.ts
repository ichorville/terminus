import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetTypeMasterService } from '../asset-type-master.service';
import { LoginVariable } from '../../../global';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-type-add',
	templateUrl: './asset-type-add.component.html',
	styleUrls: ['./asset-type-add.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetTypeAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _atms: AssetTypeMasterService
	) {
		this.title = 'Add Facility Type';
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
		let type: any = {
			// fill asset type attributes
		};
		this._atms.create(type).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/asset-types');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
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
				order: 2,
				placeholder: 'Name'
			})
		];
	}
}

