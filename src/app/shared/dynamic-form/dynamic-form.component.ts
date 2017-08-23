import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef,
	AfterContentChecked, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
	model = {};

	tempFormElements: any[];

	constructor(
		private _fcs: FormControlService,
		private cd: ChangeDetectorRef
	) {
		this.tempFormElements = [];
		this.formSubmitEvent = new FormSubmitEvent();
		this.onFormSubmit = new EventEmitter<FormSubmitEvent>();
	}

	ngOnInit() {
		this.tempFormElements = this.formElements;
		
		this.formElements.forEach(formElement => {
			this.mockModel[formElement['key']] = formElement['value'];
		});

		this.form = this._fcs.toFormGroup(this.formElements);

		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

	// content is checked for before DOm is loaded
	ngAfterContentChecked() {
		this.formElements.forEach(formElement => { 
			this.mockModel[formElement['key']] = formElement['value'];
		});	
		this.cd.detectChanges();
	}

	// detect DOM changes after view is loaded
	ngAfterViewChecked() {
		this.cd.detectChanges();
		this.tempFormElements = this.formElements;
	}

	onSubmit(event) {
		this.mockModel = event;
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

	onChange(value, event) {
		if (event.filter) {
			// get relevant form element
			this.formElements.forEach(formElement => {
				if (formElement.order == event.filter[0]['child']) {
					formElement.disabled = false;
					// get relevant temp form element
					this.tempFormElements.forEach(tempElement => {
						if (tempElement.order == event.filter[0]['child']) {
							formElement['options'] = tempElement['options'].filter(element => {
								// filter from parentUid
								if (element['parent'] == value['value']) {
									return true;
								}
							});
						}
					});
				}
			});
		}
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
