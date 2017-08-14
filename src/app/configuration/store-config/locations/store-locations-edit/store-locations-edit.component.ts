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

import { StoreLocationsService } from '../locations.service';

import { LoginVariable } from '../../../../global';

@Component({
  selector: 'app-store-location-edit',
  templateUrl: './store-locations-edit.component.html',
  styleUrls: ['./store-locations-edit.component.css']
})
export class StoreLocationsEditComponent implements OnInit {

	storeLocation: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _sls:  StoreLocationsService
  ) {
		this.title = 'Edit Store Locations';
		this.buttonValue = 'Update';
    this.storeLocation = {};
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
   }

  ngOnInit() {
	  if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let uid = params['id'];
			this._sls.get(uid).then((storeLocation) => {
				this.storeLocation = storeLocation['t'][0];
				this.createForm();
			});
		});
  }

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let storeLocation: any = {
     	    'uid': this.storeLocation.Uid,
			'id': formValues.id== '' ? this.storeLocation['Id'] : formValues.id,	
			'description': formValues.description == '' ? this.storeLocation['Description'] : formValues.description,	
			'priority': formValues.priority	== '' ? this.storeLocation['Priority'] : formValues.priority
		};
		console.log(storeLocation);
		this._sls.update(storeLocation).then(() => {
			this.router.navigateByUrl('/configuration/store/locations');
		});	
	}

private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.storeLocation['Id'],
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
				value: this.storeLocation['Description'],
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
				value: this.storeLocation['Priority'],
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
