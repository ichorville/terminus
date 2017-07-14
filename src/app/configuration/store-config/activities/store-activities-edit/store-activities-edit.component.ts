import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { StoreActivitiesService } from '../activities.service';

@Component({
	selector: 'app-store-activities-edit',
	templateUrl: './store-activities-edit.component.html',
	styleUrls: ['./store-activities-edit.component.css']
})
export class StoreActivitiesEditComponent implements OnInit {

	storeActivity: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _sas: StoreActivitiesService
	) { 
		this.storeActivity= {};
		this.title = 'Edit Store Activities';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();	
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._sas.get(id).then((storeActivity) => {
				this.storeActivity = storeActivity['t'][0];  
				this.createForm();   
			});    
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let storeActivity: any = {
			'uid': this.storeActivity.Uid,
			'id': formValues.id== '' ? this.storeActivity['Id'] : formValues.id,	
			'description': formValues.description == '' ? this.storeActivity['Description'] : formValues.description,	
			'priority': formValues.priority	== '' ? this.storeActivity['Priority'] : formValues.priority
			
		};
		this._sas.update(storeActivity).then(() => {
			this.router.navigateByUrl('/configuration/store/activities');
		});	
	}

private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.storeActivity['Id'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Id'
			}),      
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: this.storeActivity['Description'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description'
			}),
			new FormTextbox({
				key: 'priority',
				label: 'Priority',
				value: this.storeActivity['Priority'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority'
			})
		]
	}

}
