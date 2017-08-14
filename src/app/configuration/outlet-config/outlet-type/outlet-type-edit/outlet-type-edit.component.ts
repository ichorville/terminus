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

import { OutletTypeService } from '../outlet-type.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-outlet-type-edit',
	templateUrl: './outlet-type-edit.component.html',
	styleUrls: ['./outlet-type-edit.component.css']
})
export class OutletTypeEditComponent implements OnInit {

	outletType: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _ots: OutletTypeService
	) {
		this.title = 'Edit Outlet Type';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.outletType = {};
		this.createForm();
	 }

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._ots.get(id).then((outletType) => {
				this.outletType = outletType['t'][0];
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

		let outletType: any = {
			'uid': this.outletType.Uid,
			'id': formValues.id == '' ? this.outletType['ID'] : formValues.id,
			'description': formValues.description == '' ? this.outletType['Description'] : formValues.description,
			'priority': formValues.priority == '' ? this.outletType['Priority'] : formValues.priority
		};

		this._ots.update(outletType).then(() => {
			this.router.navigateByUrl('/configuration/outlets/types');
		});	
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.outletType['Id'],
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
				value: this.outletType['Description'],
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
				value: this.outletType['Priority'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Priority',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
