import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { AssignEvent } from '../../../shared/custom-events/assign-event';
import { UnassignEvent } from '../../../shared/custom-events/unassign-event';
import { FilterEvent } from '../../../shared/custom-events/filter-event';

import { MerchandiserConfigService } from '../merchandiser-config.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { OutletMasterService } from '../../../master-data/outlet-master/outlet-master.service';

@Component({
	selector: 'app-outlets',
	templateUrl: './outlets.component.html',
	styleUrls: ['./outlets.component.css']
})
export class OutletsComponent implements OnInit {

	merchandisers: any[];
	allOutlets: any[];
	outlets: any[];
	selectedMerchandiserOutletUids: any[];
	outletIndexMap: any;
	buttonValue: string;
	formElements: FormElement<any>[];

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;
	title: string;
	rows: any[];
	columns: any[];
	merchandiserOptions: { key: string, value: string }[];
	selectedMerchandiser: any;
	filterValue: string;
	showList: boolean;

	searchTerms: Subject<string>;

	constructor(
		private _mcs: MerchandiserConfigService,
		private _mms: MerchandiserMasterService,
		private _oms: OutletMasterService
	) {
		this.title = 'Manage Merchandiser Outlet Mapping';
		this.rows = [];
		this.selectedMerchandiserOutletUids = [];
		this.outletIndexMap = {};
		this.filterValue = 'all';
		this.showList = false;
		this.selectedMerchandiser = {};
		this.outlets = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */
		this._oms.all().then((outlets) => {
			this.allOutlets = outlets['t'];
			this.allOutlets.forEach((element) => {
				if (element.ExpiryDate == null) {
					this.outlets.push(element);
				} else { }
			});
			this._mms.all().then((merchandisers) => {
				this.merchandisers = merchandisers['t'].map((element => {
					return { key: element.Uid, uid: element.Uid, value: element.Name }
				}));

				this.merchandiserOptions = this.merchandisers;
				this.selectedMerchandiser = this.merchandisers.length > 0 ? this.merchandisers[0] : undefined;
				if(this.merchandisers.length > 0){
					this.loadOutlets();
				}
				this.createForm();
			});
			this.updateRows();
		});

		this.columns = [
			{ name: 'Id', attr: 'id', type: 'string' },
			{ name: 'Name', attr: 'name', type: 'string' },
		];
	}

	selectMerchandiser(event: any) {
		let uid = event.key;
		this.selectedMerchandiser = 0;
		this.showList = false;
		this.merchandisers.forEach((element) => {
			if (element.uid == uid) {
				this.selectedMerchandiser = element;
				this.loadOutlets();
				return;
			}
		});
	}

	loadOutlets() {
		this.outletIndexMap = {};
		this.selectedMerchandiserOutletUids = [];
		this._mcs.merchandiserOutlets(this.selectedMerchandiser.uid).then((outlets) => {
			let assignedOutletMap = {};
			outlets['t'].forEach((element) => {
				assignedOutletMap[element.Uid] = element.Uid;
				this.selectedMerchandiserOutletUids.push(element.Uid);
			});
			this.outlets.forEach((element, index) => {
				this.outletIndexMap[element.Uid] = index;
				element['assigned'] = assignedOutletMap[element.Uid] ? true : false;
			});
			this.updateRows();
		});
	}

	assign(assignEvent: AssignEvent) {
		this.selectedMerchandiserOutletUids.push(assignEvent.obj['id']);
		this.outlets[this.outletIndexMap[assignEvent.obj['id']]]['assigned'] = true;
		this.updateRows();
	}

	unassign(unassignEvent: UnassignEvent) {
		let index = this.selectedMerchandiserOutletUids.indexOf(unassignEvent.obj['id']);
		if (index >= 0) {
			this.selectedMerchandiserOutletUids.splice(index, 1);
		}
		this.outlets[this.outletIndexMap[unassignEvent.obj['id']]].assigned = false;
		this.updateRows();
	}

	search(term: string) {
		if (term) {
			this.merchandiserOptions = this.merchandisers.filter((element) => {
				return element.value.toLowerCase().indexOf(term.toLowerCase()) > -1;
			});
		} else {
			this.merchandiserOptions = this.merchandisers;
		}
	}

	filter(filterEvent: FilterEvent) {
		this.filterValue = filterEvent.value;
		this.updateRows();
	}

	save() {
		let payload = {
			agentUid: this.selectedMerchandiser.uid,
			outlets: this.selectedMerchandiserOutletUids
		}
		this._mcs.assignOutlets(payload).then((response) => {
		});
	}

	reset() {
		this._oms.all().then((outlets) => {
			this.allOutlets = outlets['t'];
			this.outlets = [];
			this.allOutlets.forEach((element) => {
				if (element.ExpiryDate == null) {
					this.outlets.push(element);
				} else { }
			});
			this.loadOutlets();
		});
	}

	toggleDropdown() {
		this.showList = !this.showList;
	}

	showDropdown() {
		this.showList = true;
	}

	hideDropdown() {
		this.showList = false;
	}

	private updateRows(filter?: string) {
		this.rows = [];
		let f = filter || 'all';

		if (this.filterValue == 'all') {
			this.outlets.forEach(element => {
				this.addRow(element);
			});
		} else if (this.filterValue == 'assigned') {
			this.outlets.forEach(element => {
				if (element['assigned']) {
					this.addRow(element);
				}
			});
		} else {
			this.outlets.forEach(element => {
				if (!element['assigned']) {
					this.addRow(element);
				}
			});
		}

	}

	private addRow(element: any) {
		this.rows.push({
			id: element.Uid,
			name: element.Name,
			assigned: element['assigned']
		});
	}

	private createForm() {
		this.formElements = [
			new FormDropdown({
				key: 'merchandiser',
				label: 'Merchandiser',
				value: '',
				controlType: 'dropbox',
				options: this.merchandiserOptions,
				required: true,
				order: 1
			})
		]
	}
}