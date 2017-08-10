import {Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { StoreActivityConfigService } from '../store-activity-config.service';

@Component({
	selector: 'app-store-activity-add',
	templateUrl: './store-activity-add.component.html',
	styleUrls: ['./store-activity-add.component.css']
})
	export class StoreActivityAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	categoryOptions: { key: string, value: string }[];
	typeOptions: { key: string, value: string }[];
	groupOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _sacs: StoreActivityConfigService
	) {
		this.title = 'Add Store Activity';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {

	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let storeActivity: any = {
			'id': formValues.id,
			'description': formValues.description,
			'priority': formValues.priority,
		};

		this._sacs.create(JSON.stringify(storeActivity)).then((obj) => {
		this.router.navigateByUrl('/configuration/activities/store');
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
