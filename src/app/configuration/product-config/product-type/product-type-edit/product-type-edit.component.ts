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

//import { FirebaseObjectObservable } from 'angularfire2';
import { ProductTypeService } from '../product-type.service';

@Component({
	selector: 'app-product-type-edit',
	templateUrl: './product-type-edit.component.html',
	styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

	productType: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _pts: ProductTypeService
	) {
		this.title = 'Edit Product Type';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.productType = {};
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._pts.get(id).then((productType) => {
				this.productType = productType['t'][0];
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let productType: any = {
			'uid': this.productType.Uid,
			'id': formValues.id == '' ? this.productType['Id'] : formValues.id,	
			'description': formValues.description == '' ? this.productType['Description'] : formValues.description,	
			'priority': formValues.priority	== '' ? this.productType['Priority'] : formValues.priority
		};	

		this._pts.update(productType).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/configuration/products/types');
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
				value: this.productType['Id'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Id'
			}),
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: this.productType['Description'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Description'
			}),
			new FormTextbox({
				key: 'priority',
				label: 'Priority',
				value: this.productType['Priority'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Priority'
			})
		]
	}
}
