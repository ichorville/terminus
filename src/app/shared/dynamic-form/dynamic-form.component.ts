import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElement } from '../form-elements/form-element';
import { FormControlService } from '../services/form-control.service';
import { FormSubmitEvent } from '../custom-events/form-submit-event';

@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.css'],
	providers: [FormControlService]
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

	constructor(private _fcs: FormControlService) {
		this.formSubmitEvent = new FormSubmitEvent();
		this.onFormSubmit = new EventEmitter<FormSubmitEvent>();
	}

	ngOnInit() {
		this.form = this._fcs.toFormGroup(this.formElements);
	}

	ngOnChanges() {
		this.form = this._fcs.toFormGroup(this.formElements);
	}

	submit(e) {
		this.formSubmitEvent.formObject = this.form.value;
		this.formSubmitEvent.event = e;
		this.onFormSubmit.emit(this.formSubmitEvent);
	}

	setFile(e) {
		if (e.srcElement.type == 'file') {
			this.formSubmitEvent.formFiles.push(e.target.files[0])
		}
	}

	add() {
		this.onFormSubmit.emit(this.formSubmitEvent);
	}

}
