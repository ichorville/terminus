import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetSupplierMasterService } from '../asset-supplier-master.service';
import { LoginVariable } from '../../../global';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-supplier-edit',
	templateUrl: './asset-supplier-edit.component.html',
	styleUrls: ['./asset-supplier-edit.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetSupplierEditComponent implements OnInit {

	supplier: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;	

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _asms: AssetSupplierMasterService
	) { 
		this.title = 'Edit Supplier';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			return this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._asms.get(id).then((supplier) => {
				this.supplier = supplier;
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let supplier: any = {
			// add supplier entity
		};
		this._asms.update(supplier).then(() => {
			this.router.navigateByUrl('/master-data/suppliers');
		});
	}

	private createForm() {
		this.formElements = [
			// add form elements
		];
	}
}
