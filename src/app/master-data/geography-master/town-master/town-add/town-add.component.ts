import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../../district-master/district-master.service';
import { TownMasterService } from '../town-master.service';

@Component({
	selector: 'app-town-add',
	templateUrl: './town-add.component.html',
	styleUrls: ['./town-add.component.css']
})
export class TownAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string, parent: string }[];
	regionOptions: { key: string, value: string, parent: string }[];
	districtOptions: { key: string, value: string, parent: string }[];

	constructor(
		private router: Router,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService
	) {
		this.title = 'Add Town';
		this.buttonValue = 'Save';
		this.countryOptions = [];
		this.regionOptions = [];
		this.districtOptions = [];
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		this._cms.all().then((countries) => {
			this.countryOptions = [];
			countries.forEach((element) => {
				this.countryOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
			});
			this.createForm();
			this._rms.all().then((regions) => {
				this.regionOptions = [];
				regions.forEach((element) => {
					this.regionOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
				});
				this.createForm();
				this._dms.all().then((districts) => {
					this.districtOptions = [];
					districts.forEach((element) => {
						this.districtOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
					});
					this.createForm();
				});				
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let town: any = {
			'id': formValues.id,
			'description': formValues.name,
			'parentUid': formValues.district
		};
		this._tms.create(town).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/towns');
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
				value: '',
				controlType: 'dropbox',
				disabled: false,
				options: this.countryOptions,
				filter: [{
					parent: null,
					child: 2
				}],
				required: true,
				order: 1,
				validators: [
					Validators.required,
				]
			}),
			new FormDropdown({
				key: 'region',
				label: 'Region',
				value: '',
				controlType: 'dropbox',
				disabled: true,
				options: this.regionOptions,
				filter: [{
					parent: 1,
					child: 3
				}],
				required: true,
				order: 2,
				validators: [
					Validators.required,
				]
			}),
			new FormDropdown({
				key: 'district',
				label: 'District',
				value: '',
				controlType: 'dropbox',
				disabled: true,
				options: this.districtOptions,
				filter: [{
					parent: 2,
					child: null
				}],
				required: true,
				order: 3,
				validators: [
					Validators.required,
				]
			}),
				new FormTextbox({
				key: 'id',
				label: 'Town Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'Town Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'name',
				label: 'Town Name',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 5,
				placeholder: 'Town Name',
				validators: [
					Validators.required,
				]
			})
		];
	}
}
