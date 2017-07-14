import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { ActivityService } from '../activity.service';
import { OutletMasterService } from '../../../master-data/outlet-master/outlet-master.service';
import { CustomerMasterService } from '../../../master-data/customer-master/customer-master.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { ProductMasterService } from '../../../master-data/product-master/product-master.service';
import { StoreActivitiesService } from '../../../configuration/store-config/activities/activities.service';
import { StoreLocationsService } from '../../../configuration/store-config/locations/locations.service';
import { ProductCategoryService } from '../../../configuration/product-config/product-category/product-category.service';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
	title: string;
	activities: any[];
	columns: any[];
	rows: any[];
	currentDate: any;
	previousDate: any;
	dateOffset: any = (24 * 60 * 60 * 1000) * 7;

	outletOptions: any;
	customerOptions: any;
	merchandiserOptions: any;
	brandOptions: any;
	categoryOptions: any;
	productOptions: any;
	activityOptions: any;
	locationOptions: any;

	constructor(
		private _as: ActivityService,
		private _oms: OutletMasterService,
		private _cms: CustomerMasterService,
		private _mms: MerchandiserMasterService,
		private _pms: ProductMasterService,
		private _sas: StoreActivitiesService,
		private _sls: StoreLocationsService,
		private _pcs: ProductCategoryService) {
		this.rows = [];
	}

	ngOnInit() {

		this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);

		let activity: any = {
			'from': this.previousDate,
			'to': this.currentDate,
			'merchandiser': '-1',
			'customer': '-1',
			'outlet': '-1',
			'brand': '-1',
			'category': '-1',
			'product': '-1',
			'activity': '-1',
			'location': '-1'
		};
		this._as.all(activity).then((activities) => {
			this.activities = activities;
			this.updateRows();
		});

		this._oms.all().then((outlets) => {
			this.outletOptions = [];
			outlets['t'].forEach((element) => {
				this.outletOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		this._mms.all().then((merchandisers) => {
			this.merchandiserOptions = [];
			merchandisers['t'].forEach((element) => {
				this.merchandiserOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		this._cms.all().then((customers) => {
			this.customerOptions = [];
			customers.forEach((element) => {
				this.customerOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		this._pms.all().then((products) => {
			this.productOptions = [];
			products['t'].forEach((element) => {
				this.productOptions.push({ key: element.Uid, value: element.Description });
			});
		});

		this._sas.all().then((activities) => {
			this.activityOptions = [];
			activities['t'].forEach((element) => {
				this.activityOptions.push({ key: element.Uid, value: element.Description });
			});
		});

		this._sls.all().then((locations) => {
			this.locationOptions = [];
			locations['t'].forEach((element) => {
				this.locationOptions.push({ key: element.Uid, value: element.Description });
			});
		});

		this._pcs.all().then((productCategory) => {
			this.categoryOptions = [];
			productCategory['t'].forEach((element) => {
				this.categoryOptions.push({ key: element.Uid, value: element.Description });
				if(element.CategoryType==2){
					this.brandOptions.push({ key: element.Uid, value: element.Description });	
				}
			});
		});

		this.title = 'Activities';
		this.columns = [
			{ name: 'ID', attr: 'callId', type: 'string' },
			{ name: 'Start', attr: 'start', type: 'string' },
			{ name: 'End', attr: 'end', type: 'string' },
			{ name: 'Outlet', attr: 'outlet', type: 'string' },
			{ name: 'Merchandiser', attr: 'merchandiser', type: 'string' },
			{ name: 'Brand', attr: 'brand', type: 'string' },
			{ name: 'Category', attr: 'category', type: 'string' },
			{ name: 'Product', attr: 'product', type: 'string' },
			{ name: 'Store Activity', attr: 'activity', type: 'string' },
			{ name: 'Store Location', attr: 'location', type: 'string' },

		];
	}

	submit(formSubmitEvent) {
		formSubmitEvent.preventDefault();

		let activity: any = {
			'from': formSubmitEvent.target[0].value,
			'to': formSubmitEvent.target[1].value,
			'merchandiser': formSubmitEvent.target[2].value,
			'customer': formSubmitEvent.target[3].value,
			'outlet': formSubmitEvent.target[4].value,
			'brand': formSubmitEvent.target[5].value,
			'category': formSubmitEvent.target[6].value,
			'product': formSubmitEvent.target[7].value,
			'activity': formSubmitEvent.target[8].value,
			'location': formSubmitEvent.target[9].value
		};

		this._as.all(activity).then((activities) => {
			this.activities = activities;
			this.updateRows();
		});
	}

	private updateRows() {
		this.rows = [];
		this.activities.forEach(element => {
			this.rows.push({
				uid: element.UID,
				callId: element.CallID,
				start: element.ScheduledStart,
				end: element.ScheduledEnd,
				outlet: element.Outlet,
				merchandiser: element.Agent,
				brand:element.Brand,
				category:element.Category,
				product: element.Item,
				activity: element.Activity,
				location: element.StoreLocation
			});
		});
	}


}
