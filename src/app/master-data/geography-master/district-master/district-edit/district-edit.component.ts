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

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../district-master.service';
import { TownMasterService } from '../../town-master/town-master.service';


@Component({
	selector: 'app-district-edit',
	templateUrl: './district-edit.component.html',
	styleUrls: ['./district-edit.component.css']
})
export class DistrictEditComponent implements OnInit {

	district: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	countryOptions: { key: string, value: string }[];
	regionOptions: { key: string, value: string }[];

	uid: string;
	country: string;
	region: string;
	districtParentUid: string;
	regionParentUid: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService
	) {
		this.title = "Edit District";
		this.buttonValue = "Update";
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.district = {};
		this.countryOptions = [];
		this.regionOptions = [];
		this.createForm();
	}


	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._dms.get(id).then((district) => {
				this.district = district[0];
				this.districtParentUid = district[0].ParentUid;

				this._rms.all().then((regions) => {
					this.regionOptions = [];
					regions.forEach((element) => {
						if (this.districtParentUid == element.Uid) {
							this.regionParentUid = element.ParentUid;
							this.region = element.Description;
						}
						this.regionOptions.push({ key: element.Uid, value: element.Description });
					});

					this._cms.all().then((countries) => {
						this.countryOptions = [];
						countries.forEach((element) => {
							this.countryOptions.push({ key: element.Uid, value: element.Description });
							if (this.regionParentUid == element.Uid) {
								this.country = element.Description;
							}
						});
						this.createForm();
					});
				});
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let district: any = {
			'uid': this.district['Uid'],
			'id': formValues.id == '' ? this.district['Id'] : formValues.id,
			'description': formValues.description == '' ? this.district['Description'] : formValues.description,
			'parentUid': formValues.region == '' ? this.district['ParentUid'] : formValues.region,

		};
		this._dms.update(district).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/master-data/geographies/districts');
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
				required: true,
				order: 1
			}),
			new FormDropdown({
				key: 'region',
				label: 'Region',
				value: this.districtParentUid,
				controlType: 'dropbox',
				options: this.regionOptions,
				required: true,
				order: 2
			}),
			new FormTextbox({
				key: 'id',
				label: 'District Id',
				value: this.district['Id'],
				controlType: 'textbox',
				required: true,
				order: 3,
				placeholder: 'District Id'
			}),
			new FormTextbox({
				key: 'description',
				label: 'District Name',
				value: this.district['Description'],
				controlType: 'textbox',
				required: true,
				order: 4,
				placeholder: 'District Name'
			})
		];
	}
}



