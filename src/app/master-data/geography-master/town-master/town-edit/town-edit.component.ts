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
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../../district-master/district-master.service';
import { TownMasterService } from '../town-master.service';

@Component({
	selector: 'app-town-edit',
	templateUrl: './town-edit.component.html',
	styleUrls: ['./town-edit.component.css']
})
export class TownEditComponent implements OnInit {

	town: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string, parent: string }[];
	regionOptions: { key: string, value: string, parent: string }[];
	districtOptions: { key: string, value: string, parent: string }[];

	uid: string;
	parentUid: number;
	country: string;
	region: string;
	district: string;
	districtParentUid: number;
	regionParentUid: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService
	) {
		this.title = "Edit Town";
		this.buttonValue = "Update";
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.town = {};
		this.countryOptions = [];
		this.regionOptions = [];
		this.districtOptions = [];
		this.createForm();
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._tms.get(id).then((town) => {
				this.town = town[0];
				this.parentUid = town[0].ParentUid;
				this.createForm();

				this._dms.all().then((districts) => {
					this.districtOptions = [];
					districts.forEach((element) => {
						this.districtOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
						if (this.parentUid == element.Uid) {
							this.district = element.Description;
							this.districtParentUid = element.ParentUid;
						}
					});

					this._rms.all().then((regions) => {
						this.regionOptions = [];
						regions.forEach((element) => {
							this.regionOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
							if (this.districtParentUid == element.Uid) {
								this.region = element.Description;
								this.regionParentUid = element.ParentUid;
							}
						});

						this._cms.all().then((countries) => {
							this.countryOptions = [];
							countries.forEach((element) => {
								this.countryOptions.push({ key: element.Uid, value: element.Description, parent: element.ParentUid });
								if (this.regionParentUid == element.Uid) {
									this.country = element.Description;
								}
							});
							this.createForm();
						});
					});
				});
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let town: any = {
			'uid': +this.town['Uid'],
			'id': formValues.id == '' ? this.town['Id'] : formValues.id,
			'description': formValues.description == '' ? this.town['Description'] : formValues.description,
			'parentUid': formValues.district == '' ? this.town['ParentUid'] : +formValues.district
		};

		this._tms.update(town).then((status) => {
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
				value: this.regionParentUid,
				controlType: 'dropbox',
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
				value: this.districtParentUid,
				controlType: 'dropbox',
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
				value: this.town['ParentUid'],
				controlType: 'dropbox',
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
				value: this.town['Id'],
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'Town Id',
				validators: [
					Validators.required,
				]
			}),
			new FormTextbox({
				key: 'description',
				label: 'Town Name',
				value: this.town['Description'],
				controlType: 'textbox',
				required: true,
				order: 5,
				placeholder: 'Town Name',
				validators: [
					Validators.required,
				]
			})
		]
	}
}
