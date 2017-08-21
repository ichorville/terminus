import {Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { CountryMasterService } from '../country-master.service';

import { fadeInAnimation } from '../../../../shared/animations/fade-in.animation';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-country-add',
	templateUrl: './country-add.component.html',
	styleUrls: ['./country-add.component.css'],
	animations: [fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class CountryAddComponent implements OnInit {
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	gridState: string;
	messageCssClass: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _cms: CountryMasterService
	) {
		this.title = 'Add Country';
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
		let country: any = {
			'id': formValues.id,
			'description': formValues.name
		};
		this._cms.create(country).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/countries');
			} else {
				alert('Cannot Add Due to Error');
			}	
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Country Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Country Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'name',
				label: 'Country Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Country Name',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
