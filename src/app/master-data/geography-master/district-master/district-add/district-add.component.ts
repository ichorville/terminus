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

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../district-master.service';

@Component({
	selector: 'app-district-add',
	templateUrl: './district-add.component.html',
	styleUrls: ['./district-add.component.css']
})
export class DistrictAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	gridState: string;
	messageCssClass: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string }[];
	regionOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService
	) {
		this.title = 'Add District';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		this._cms.all().then((countries) => {
			this.countryOptions = [];
			countries.forEach((element) => {
				this.countryOptions.push({ key: element.Uid, value: element.Description });
			});
			this._rms.all().then((regions) => {
				this.regionOptions = [];
				regions.forEach((element) => {
					this.regionOptions.push({ key: element.Uid, value: element.Description });
				});
				this.createForm();
			}); 
		});
	}  

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let district: any = {
			'id': formValues.id,
			'description': formValues.name,
			'parentUid': formValues.region
		};
		this._dms.create(district).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/districts');
			} else {
				alert('Cannot Add Due to Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormDropdown({
				key: 'country',
				label: 'Country',
				value: '',
				controlType: 'dropbox',
				options: this.countryOptions,
				required: true,
				order: 1
			}),
			new FormDropdown({
				key: 'region',
				label: 'Region',
				value: '',
				controlType: 'dropbox',
				options: this.regionOptions,
				required: true,
				order: 2
			}),
			new FormTextbox({
				key: 'id',
				label: 'District Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'District Id'
			}),
			new FormTextbox({
				key: 'name',
				label: 'District Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'District Name'
			})
		];
	}
}
