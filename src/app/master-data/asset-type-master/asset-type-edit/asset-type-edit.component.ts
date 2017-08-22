import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Validators } from '@angular/forms';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetTypeMasterService } from '../asset-type-master.service';
import { LoginVariable } from '../../../global';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-type-edit',
	templateUrl: './asset-type-edit.component.html',
	styleUrls: ['./asset-type-edit.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetTypeEditComponent implements OnInit {

	type: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;	

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _atms: AssetTypeMasterService
	) { 
		this.title = 'Edit Facility Type';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			return this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._atms.get(id).then((type) => {
				this.type = type;
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let type: any = {
			// add asset entity
		};
		this._atms.update(type).then(() => {
			this.router.navigateByUrl('/master-data/asset-types');
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'ID',
				label: 'ID',
				value: this.type['ID'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'ID',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'AssetType',
				label: 'Type',
				value: this.type['AssetType'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Type',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
