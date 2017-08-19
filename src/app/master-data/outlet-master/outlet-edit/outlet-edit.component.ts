import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-outlet-edit',
	templateUrl: './outlet-edit.component.html',
	styleUrls: ['./outlet-edit.component.css']
})
export class OutletEditComponent implements OnInit {

	outlet: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;
	gridState: string;
	messageCssClass: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;

	customerOptions: { key: string, value: string }[];
	countryOptions: { key: string, value: string }[];
	regionOptions: { key: string, value: string }[];
	districtOptions: { key: string, value: string }[];
	townOptions: { key: string, value: string }[];
	outletClassOptions: { key: string, value: string }[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _oms: OutletMasterService,
		private _cms: CustomerMasterService,
		private _ocs: OutletClassService,
		private _ctms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService
	) {
		this.title = 'Edit Outlet';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.customerOptions = [];
		this.regionOptions = [];
		this.districtOptions = [];
		this.townOptions = [];
		this.outlet = {};
		this.createForm();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			return this.router.navigateByUrl(`/login`);
		}
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._oms.get(id).then((outlet) => {
				console.log(outlet);
				this.outlet = outlet[0];
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
						this.countryOptions.push({ key: element.Uid, value: element.Description })
					});
					this.createForm();
				});

				this._rms.all().then((regions) => {
					this.regionOptions = [];
					regions.forEach((element) => {
						this.regionOptions.push({ key: element.Uid, value: element.Description })
					});
					this.createForm();
				})

				this._dms.all().then((districts) => {
					this.districtOptions = [];
					districts.forEach((element) => {
						this.districtOptions.push({ key: element.Uid, value: element.Description })
					});
					this.createForm();
				})

				this._tms.all().then((towns) => {
					this.townOptions = [];
					towns.forEach((element) => {
						this.townOptions.push({ key: element.Uid, value: element.Description })
					});
					this.createForm();
				});

				this._ocs.all().then((classes) => {
					this.outletClassOptions = [];
					classes = classes['t'];
					classes.forEach((element) => {
						this.outletClassOptions.push({ key: element.UID, value: element.Description });
					});
					this.createForm();
				});
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let outlet: any = {
			'uid': this.outlet['Uid'],
			'id': formValues.outletId,
			'name': formValues.name,
			'registrationNumber': formValues.registrationNumber,
			'streetAddress': formValues.address,
			'customerUid': formValues.customer,
			'geographicalAreaUid': formValues.town,
			'postalCode': formValues.postalCode,
			'telephone1': formValues.phone,
			'telephone2': formValues.mobile,
			'fax': formValues.fax,
			'email': formValues.email,
			'classUid': formValues.outletClass,
			'visitFrequency': formValues.visitFrequency
		};
		this._oms.update(outlet).then(() => {
			this.router.navigateByUrl('/master-data/outlets');
		});
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'outletId',
				label: 'Outlet Id',
				value: this.outlet['Id'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Outlet Id'
			}),
			new FormTextbox({
				key: 'name',
				label: 'Name',
				value: this.outlet['Name'],
				controlType: 'textbox',
				type: 'text',
				requried: true,
				order: 2,
				placeholder: 'Name'
			}),
			new FormTextbox({
				key: 'registrationNumber',
				label: 'Registration Number',
				value: this.outlet['RegistrationNumber'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 3,
				placeholder: 'Registration Number'
			}),
			new FormTextbox({
				key: 'address',
				label: 'Street Address',
				value: this.outlet['StreetAddress'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 3,
				placeholder: 'Address'
			}),
			new FormDropdown({
				key: 'customer',
				label: 'Customer',
				value: this.outlet['CustomerUid'],
				controlType: 'dropdown',
				options: this.customerOptions,
				required: true,
				order: 4
			}),
			new FormDropdown({
				key: 'region',
				label: 'Region',
				value: this.outlet['RegionUid'],
				controlType: 'dropdown',
				options: this.regionOptions,
				required: true,
				order: 5
			}),
			new FormDropdown({
				key: 'district',
				label: 'District',
				value: this.outlet['DistrictUid'],
				controlType: 'dropdown',
				options: this.districtOptions,
				required: true,
				order: 6
			}),
			new FormDropdown({
				key: 'town',
				label: 'Town',
				value: this.outlet['TownUid'],
				controlType: 'dropdown',
				options: this.townOptions,
				required: true,
				order: 7
			}),
			new FormTextbox({
				key: 'postalCode',
				label: 'Postal Code',
				value: this.outlet['PostalCode'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 8,
				placeholder: 'Postal Code'
			}),
			new FormTextbox({
				key: 'phone',
				label: 'Phone',
				value: this.outlet['Telephone1'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 9,
				placeholder: 'Phone'
			}),
			new FormTextbox({
				key: 'mobile',
				label: 'Mobile',
				value: this.outlet['Telephone2'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 10,
				placeholder: 'Mobile'
			}),
			new FormTextbox({
				key: 'fax',
				label: 'Fax',
				value: this.outlet['Fax'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 11,
				placeholder: 'Fax'
			}),
			new FormTextbox({
				key: 'email',
				label: 'Email',
				value: this.outlet['Email'],
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 12,
				placeholder: 'Email'
			}),
			new FormDropdown({
				key: 'outletClass',
				label: 'Outlet Class',
				value: this.outlet['ClassUid'],
				controlType: 'dropdown',
				options: this.outletClassOptions,
				required: true,
				order: 13
			}),
			new FormTextbox({
				key: 'visitFrequency',
				label: 'Visit Frequency',
				value: this.outlet['visitFrequency'] || 0,
				controlType: 'textbox',
				type: 'text',
				requried: false,
				order: 14,
				placeholder: 'Visit Frequency'
			}),
		]
	}
}
