import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetMasterService } from '../asset-master.service';
import { LoginVariable } from '../../../global';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-master-add',
	templateUrl: './asset-master-add.component.html',
	styleUrls: ['./asset-master-add.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetMasterAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _ams: AssetMasterService
	) { 
		this.title = 'Add Asset';
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
		let asset: any = {

		};
		this._ams.create(asset).then((response) => {
			if (response.status == 200) {
				this.router.navigateByUrl(`/master-data/assets`);
			} else {
				alert('Asset Add Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			// add necessary form fields
		];
	}
}
