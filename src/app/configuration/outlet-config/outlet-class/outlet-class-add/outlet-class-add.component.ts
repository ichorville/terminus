import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { OutletClassService } from '../outlet-class.service';

@Component({
	selector: 'app-outlet-class-add',
	templateUrl: './outlet-class-add.component.html',
	styleUrls: ['./outlet-class-add.component.css']
})
export class OutletClassAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private _ocs: OutletClassService
	) {
		this.title = 'Add Outlet Class';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {

	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let outletClass: any = {
			'id': formValues.id,	
			'description': formValues.description,	
			'priority': formValues.priority		
		};

		this._ocs.create(outletClass).then((outletClass) => {
			this.router.navigateByUrl('/configuration/outlets/classes');
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
				placeholder: 'Id'
			}),
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description'
			}),
			new FormTextbox({
				key: 'priority',
				label: 'Priority',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority'
			})
		]
	}
}
