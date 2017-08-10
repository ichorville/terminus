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

//import { FirebaseObjectObservable } from 'angularfire2';
import { ProductGroupService } from '../product-group.service';

@Component({
	selector: 'app-product-group-edit',
	templateUrl: './product-group-edit.component.html',
	styleUrls: ['./product-group-edit.component.css']
})
export class ProductGroupEditComponent implements OnInit {

	productGroup: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _pgs: ProductGroupService
	) {
		this.title = 'Edit Product Group';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.productGroup = {};
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._pgs.get(id).then((productGroup) => {
				this.productGroup = productGroup['t'][0];
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productGroup: any = {
			'uid': this.productGroup.Uid,
			'id': formValues.id == '' ? this.productGroup['Id'] : formValues.id,	
			'description': formValues.description == '' ? this.productGroup['Description'] : formValues.description,	
			'priority': formValues.priority	== '' ? this.productGroup['Priority'] : formValues.priority
		};
		
		this._pgs.update(productGroup).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/configuration/products/groups');
			} else {
				alert('Cannot Edit Due to Error');
			}
		});	
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: this.productGroup['Id'],
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
				value: this.productGroup['Description'],
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
				value: this.productGroup['Priority'],
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
