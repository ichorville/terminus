import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssetMasterService } from '../asset-master.service';
import { LoginVariable } from '../../../global';
import { fadeInAnimation } from '../../../shared/animations/fade-in.animation';

@Component({
	selector: 'app-asset-master-edit',
	templateUrl: './asset-master-edit.component.html',
	styleUrls: ['./asset-master-edit.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class AssetMasterEditComponent implements OnInit {

	asset: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;	

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _ams: AssetMasterService
	) { 
		this.title = 'Edit Outlet';
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
			this._ams.get(id).then((asset) => {
				this.asset = asset;
				this.createForm();
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let asset: any = {
			// add asset entity
		};
		this._ams.update(asset).then(() => {
			this.router.navigateByUrl('/master-data/assets');
		});
	}

	private createForm() {
		this.formElements = [
			// add form elements
		];
	}
}
