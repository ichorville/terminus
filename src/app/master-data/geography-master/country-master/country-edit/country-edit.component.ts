import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
	selector: 'app-country-edit',
	templateUrl: './country-edit.component.html',
	styleUrls: ['./country-edit.component.css'],
	animations: [fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class CountryEditComponent implements OnInit {

	country: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _cms: CountryMasterService
	) {
		this.title = 'Edit Country';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.country = {};
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._cms.get(id).then((country) => {
				this.country = country[0];
				this.createForm();
			});
		});    
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let country: any = {
			'uid': this.country['Uid'],
			'id': formValues.id == '' ? this.country['Id'] : formValues.id,
			'description': formValues.description == '' ? this.country['Description'] : formValues.description
		};

		this._cms.update(country).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/countries');
			} else {
				alert('Cannot Update Due to Error');
			}
		});       
	}           

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Country Id',
				value: this.country['Id'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Country Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'description',
				label: 'Country Name',
				value: this.country['Description'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
