import { Component, OnInit, Input, 
	AfterContentChecked, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElement } from '../form-elements/form-element';
import { FormControlService } from '../services/form-control.service';
import { FormSubmitEvent } from '../custom-events/form-submit-event';

@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.css'],
	providers: [
		FormControlService
	]
})
export class DynamicFormComponent implements OnInit {

	@Input()
	formElements: FormElement<any>[];

	@Input()
	buttonValue: string;

	@Input()
	title: string;

	@Output()
	onFormSubmit: EventEmitter<FormSubmitEvent>;

	form: FormGroup;
	formSubmitEvent: FormSubmitEvent;

	mockModel = {};

	constructor(
		private _fcs: FormControlService
	) {
		this.formSubmitEvent = new FormSubmitEvent();
		this.onFormSubmit = new EventEmitter<FormSubmitEvent>();
	}

	ngOnInit() {
		this.formElements.forEach(formElement => {
			this.mockModel[formElement['key']] = formElement['value'];
		});

		this.form = this._fcs.toFormGroup(this.formElements);

		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

	ngAfterContentChecked() {
		this.formElements.forEach(formElement => {
			this.mockModel[formElement['key']] = formElement['value'];
		});
	}

	onSubmit() {
		if (this.form.valid) {
			this.formSubmitEvent.formObject = this.mockModel;
			this.formSubmitEvent.event = 'submitEvent';
			this.onFormSubmit.emit(this.formSubmitEvent);
		} else {
			this.onValueChanged();
		}
	}

	setFile(e) {
		if (e.srcElement.type == 'file') {
			this.formSubmitEvent.formFiles.push(e.target.files[0])
		}
	}

	add() {
		this.onFormSubmit.emit(this.formSubmitEvent);
	}

	onValueChanged(data?: any) {
		if (!this.form) {
			return;
		}
		const form = this.form;

		for (const formElement in this.formElements) {
			this.formElements[formElement]['errors'] = [];
			const control = form.get(this.formElements[formElement]['key']);
			if (control && control.dirty && !control.valid) {
				const message = `${this.formElements[formElement]['placeholder']} is required`;
				this.formElements[formElement]['errors'].push(message);
			}
		}
	}
}
