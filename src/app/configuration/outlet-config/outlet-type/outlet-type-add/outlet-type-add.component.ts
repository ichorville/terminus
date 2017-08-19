import {
	Component, OnInit, Output, EventEmitter, state,
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

import { OutletTypeService } from '../outlet-type.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-outlet-type-add',
	templateUrl: './outlet-type-add.component.html',
	styleUrls: ['./outlet-type-add.component.css']
})
export class OutletTypeAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _ots: OutletTypeService
	) { 
		this.title = 'Add Outlet Type';
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
		let outletType: any = {
			'id': formValues.id,	
			'description': formValues.description,
			'priority': formValues.priority
		};

		this._ots.create(outletType).then((outletType) => {
			this.router.navigateByUrl('/configuration/outlets/types');
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
				required: true,
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
				required: true,
				order: 2,
				placeholder: 'priority',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
