import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { OutletMasterService } from '../outlet-master.service';
import { CustomerMasterService } from '../../customer-master/customer-master.service';
import { CountryMasterService } from '../../geography-master/country-master/country-master.service';
import { RegionMasterService } from '../../geography-master/region-master/region-master.service';
import { DistrictMasterService } from '../../geography-master/district-master/district-master.service';
import { TownMasterService } from '../../geography-master/town-master/town-master.service';
import { OutletClassService } from '../../../configuration/outlet-config/outlet-class/outlet-class.service';

@Component({
	selector: 'app-outlet-add',
	templateUrl: './outlet-add.component.html',
	styleUrls: ['./outlet-add.component.css']
})
export class OutletAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string; 

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	customerOptions: { key: string, value: string }[];
	countryOptions: { key: string, value: string }[];
	regionOptions: { key: string, value: string }[];
	districtOptions: { key: string, value: string }[];
	townOptions: { key: string, value: string }[];
	classOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _oms: OutletMasterService,
		private _cms: CustomerMasterService,
		private _ocs: OutletClassService,
		private _ctms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService,
	) {
		this.title = 'Add Outlet';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.customerOptions = [];
		this.regionOptions = [];
		this.districtOptions = [];
		this.townOptions = [];
		this.classOptions = [];
		this.createForm();
	}

	ngOnInit() {
		this._cms.all().then((customers) => {
			this.customerOptions = [];
			customers.forEach((element) => {
				this.customerOptions.push({ key: element.Uid, value: element.Name });
			});
			this.createForm();
		});

		this._ctms.all().then((countries) => {
			this.countryOptions = [];
			countries.forEach((element) => {
				this.countryOptions.push({key: element.Uid, value: element.Description})
			});
			this.createForm();
		});

		this._rms.all().then((regions) => {
			this.regionOptions = [];
			regions.forEach((element) => {
				this.regionOptions.push({key: element.Uid, value: element.Description})
			});
			this.createForm();
		})

		this._dms.all().then((districts) => {
			this.districtOptions = [];
			districts.forEach((element) => {
				this.districtOptions.push({key: element.Uid, value: element.Description})
			});
			this.createForm();
		})

		this._tms.all().then((towns) => {
			this.townOptions = [];
			towns.forEach((element) => {
				this.townOptions.push({key: element.Uid, value: element.Description})
			});
			this.createForm();
		});

		this._ocs.all().then((classes) => {
			this.classOptions = [];
			classes = classes['t'];
			classes.forEach((element) => {
				this.classOptions.push({ key: element.Uid, value: element.Description });
			});
			this.createForm();
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let outlet: any = {
			'id': formValues.id,
			'name': formValues.name,
			'registrationNumber': formValues.registrationNumber,
			'classUid': +formValues.outletClass,
			'customerUid': +formValues.customer,
			'geographicalAreaUid': +formValues.town,
			'postalCode': formValues.postalCode,
			'telephone1': formValues.phone,
			'telephone2': formValues.mobile,
			'streetAddress': formValues.address,
			'email': formValues.email,
			'fax': formValues.fax,
			'visitFrequency': +formValues.visitFrequency
		};

		this._oms.create(outlet).then(response => {
			if (response.status == 200) {
				this.router.navigateByUrl('/master-data/outlets');
			} else {
				alert('Outlet Add Error');
			}
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'id',
				label: 'Id',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Id'
			}),
			new FormTextbox({
				key: 'name',
				label: 'Name',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: true,
				order: 2,
				placeholder: 'Name'
			}),
			new FormTextbox({
				key: 'registrationNumber',
				label: 'Registration Number',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: true,
				order: 3,
				placeholder: 'Name'
			}),
			new FormDropdown({
				key: 'outletClass',
				label: 'Outlet Class',
				value: '',
				controlType: 'dropbox',
				options: this.classOptions,
				required: true,
				order: 4
			}),
			new FormDropdown({
				key: 'customer',
				label: 'Customer',
				value: '',
				controlType: 'dropbox',
				options: this.customerOptions,
				required: true,
				order: 5
			}),
			new FormDropdown({
				key: 'country',
				label: 'Country',
				value: '',
				controlType: 'dropbox',
				options: this.countryOptions,
				required: true,
				order: 6
			}),
			new FormDropdown({
				key: 'region',
				label: 'Region',
				value: '',
				controlType: 'dropbox',
				options: this.regionOptions,
				required: true,
				order: 7
			}),
			new FormDropdown({
				key: 'district',
				label: 'District',
				value: '',
				controlType: 'dropbox',
				options: this.districtOptions,
				required: true,
				order: 8
			}),
			new FormDropdown({
				key: 'town',
				label: 'Town',
				value: '',
				controlType: 'dropbox',
				options: this.townOptions,
				required: true,
				order: 9
			}),
			new FormTextbox({
				key: 'postalCode',
				label: 'Postal Code',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 10,
				placeholder: 'Postal Code'
			}),
			new FormTextbox({
				key: 'phone',
				label: 'Phone',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 11,
				placeholder: 'Phone'
			}),
			new FormTextbox({
				key: 'mobile',
				label: 'Mobile',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 12,
				placeholder: 'Mobile'
			}),
			new FormTextbox({
				key: 'address',
				label: 'Street Address',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 13,
				placeholder: 'Street Address'
			}),
			new FormTextbox({
				key: 'email',
				label: 'Email',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 14,
				placeholder: 'Email'
			}),
			new FormTextbox({
				key: 'fax',
				label: 'Fax',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 15,
				placeholder: 'Fax'
			}),			
			new FormTextbox({
				key: 'visitFrequency',
				label: 'Visit Frequency',
				value: '',
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 16,
				placeholder: 'Visit Frequency'
			}),
		]
	}
}
