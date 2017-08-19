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

import { OutletClassService } from '../outlet-class.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-outlet-class-edit',
	templateUrl: './outlet-class-edit.component.html',
	styleUrls: ['./outlet-class-edit.component.css']
})
export class OutletClassEditComponent implements OnInit {

	outletClass: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _ocs: OutletClassService
	) {
		this.title = 'Edit Outlet Class';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.outletClass = {};
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._ocs.get(id).then((outletClass) => {
				this.outletClass = outletClass['t'][0];
				this.createForm();
			});
		});
	}	

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let index = 0;
		for(var i in formValues) {
			if(formValues[i] == '') {
				 formValues[i] = this.formElements[index].value;
			}
			index++;
		}

		let outletClass: any = {
			'uid': this.outletClass.Uid,
			'id': formValues.id,
			'description': formValues.description,			
			'priority': formValues.priority
		};

		this._ocs.update(outletClass).then(() => {
			this.router.navigateByUrl('/configuration/outlets/classes');
		});	
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.outletClass['Id'],
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
				value: this.outletClass['Description'],
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
				value: this.outletClass['Priority'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority',
				validators: [
					Validators.required,
				]
			})
		]
	}
}
