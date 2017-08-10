import {Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { StoreLocationsService } from '../locations.service';

@Component({
  selector: 'app-store-location-add',
  templateUrl: './store-locations-add.component.html',
  styleUrls: ['./store-locations-add.component.css']
})
export class StoreLocationsAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _sacs: StoreLocationsService
	)
	 {
		this.title = 'Add Location';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {

	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let storeLocation: any = {
			'id': formValues.id,
			'description': formValues.description,
			'priority': formValues.priority,
		};

		this._sacs.create(storeLocation).then((obj) => {
			this.router.navigateByUrl('/configuration/store/locations');
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
				type: 'text',
				requried: true,
				order: 3,
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
				type: 'text',
				requried: false,
				order: 3,
				placeholder: 'Priority',
				validators: [
					Validators.required,
				]
			}),
		]
	}
}
