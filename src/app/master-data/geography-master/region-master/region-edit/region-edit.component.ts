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

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../region-master.service';

@Component({
	selector: 'app-region-edit',
	templateUrl: './region-edit.component.html',
	styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {

	region: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string }[];

	uid: string;
	country: string;
	regionParentUid: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
	) {
		this.title = "Edit Region";
		this.buttonValue = "Update";
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.region = {};
		this.countryOptions = [];
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._rms.get(id).then((region) => {
				this.region = region[0];
				this.regionParentUid = region[0].ParentUid;
				this.createForm();

				this._cms.all().then((countries) => {
					this.countryOptions = [];
					countries.forEach((element) => {
						if (this.regionParentUid == element.Uid) {
							this.country = element.Description;
						}
						this.countryOptions.push({ key: element.Uid, value: element.Description });
					});
					this.createForm();
				});				
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let region: any = {
			'uid': this.region['Uid'],
			'id': formValues.id == '' ? this.region['Id'] : formValues.id,
			'description': formValues.description == '' ? this.region['Description'] : formValues.description,
			'parentUid': formValues.country == '' ? this.region['ParentUid'] : formValues.country
		};
		this._rms.update(region).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/regions');
			} else {
				alert('Cannot Update Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormDropdown({
				key: 'country',
				label: 'Country',
				value: this.regionParentUid,
				controlType: 'dropbox',
				options: this.countryOptions,
				filter: [{
					parent: null,
					child: null
				}],
				required: true,
				order: 1,
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'id',
				label: 'Region Id',
				value: this.region['Id'],
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Region Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'description',
				label: 'Region Name',
				value: this.region['Description'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Region Name',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
