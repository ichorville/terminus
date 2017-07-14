import {Component, OnInit, Output, EventEmitter, state,
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
import { RegionMasterService } from '../region-master.service';

@Component({
	selector: 'app-region-add',
	templateUrl: './region-add.component.html',
	styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService
	) {
		this.title = 'Add Region';
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
			this.createForm();
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let region: any = {
			'id': formValues.id,
			'description': formValues.name,
			'parentUid': formValues.country
		};
		this._rms.create(region).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/regions');
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
			new FormTextbox({
				key: 'id',
				label: 'Region Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 2,
				placeholder: 'Region Id'
			}),
			new FormTextbox({
				key: 'name',
				label: 'Region Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'Region Name'
			})
		];
	}
}
