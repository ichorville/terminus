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
import { ProductMasterService } from '../../../master-data/product-master/product-master.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	merchandisers: any[];
	allProducts: any[];
	products: any[];
	selectedMerchandiserProductUids: any[];
	productIndexMap: any;
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
		private _pms: ProductMasterService
	) {
		this.title = 'Manage Merchandiser Product Mapping';
		this.rows = [];
		this.selectedMerchandiserProductUids = [];
		this.productIndexMap = {};
		this.filterValue = 'all';
		this.showList = false;
		this.selectedMerchandiser = {};
		this.products = [];
	}

	ngOnInit() {

		/**
		 * Get all entities and load all entities
		 */
		this._pms.all().then((products) => {
			this.allProducts = products['t'];
			this.allProducts.forEach((element) => {
				if (element.ExpiryDate == null) {
					this.products.push(element);
				} else { }
			});
			this._mms.all().then((merchandisers) => {
				this.merchandisers = merchandisers['t'].map((element => {
					return { key: element.Uid, uid: element.Uid, value: element.Name }
				}));
				this.merchandiserOptions = this.merchandisers;
				this.selectedMerchandiser = this.merchandisers.length > 0 ? this.merchandisers[0] : undefined;
				if(this.merchandisers.length>0)
				{
					this.loadProducts();
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
				this.loadProducts();
				return;
			}
		});
	}

	loadProducts() {
		this.productIndexMap = {};
		this.selectedMerchandiserProductUids = [];
		this._mcs.merchandiserProducts(this.selectedMerchandiser.uid).then((products) => {
			let assignedProductMap = {};

			products['t'].forEach((element) => {
				if (element.ExpiryDate == null) {
					assignedProductMap[element.Uid] = element.Uid;
					this.selectedMerchandiserProductUids.push(element.Uid);
				}
			});
			this.products.forEach((element, index) => {
				this.productIndexMap[element.Uid] = index;
				element['assigned'] = assignedProductMap[element.Uid] ? true : false;
			});

			this.updateRows();
		});
	}

	assign(assignEvent: AssignEvent) {
		this.selectedMerchandiserProductUids.push(assignEvent.obj['id']);
		this.products[this.productIndexMap[assignEvent.obj['id']]]['assigned'] = true;
		this.updateRows();
	}

	unassign(unassignEvent: UnassignEvent) {
		let index = this.selectedMerchandiserProductUids.indexOf(unassignEvent.obj['id']);
		if (index >= 0) {
			this.selectedMerchandiserProductUids.splice(index, 1);
		}
		this.products[this.productIndexMap[unassignEvent.obj['id']]].assigned = false;
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
			products: this.selectedMerchandiserProductUids
		}
		this._mcs.assignProducts(payload).then((response) => {
		});
	}

	reset() {
		this._pms.all().then((products) => {
			this.allProducts = products['t'];
			this.products = [];
			this.allProducts.forEach((element) => {
				if (element.ExpiryDate == null) {
					this.products.push(element);
				}
			});
			this.loadProducts();
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
			this.products.forEach(element => {
				this.addRow(element);
			});
		} else if (this.filterValue == 'assigned') {
			this.products.forEach(element => {
				if (element['assigned']) {
					this.addRow(element);
				}
			});
		} else {
			this.products.forEach(element => {
				if (!element['assigned']) {
					this.addRow(element);
					console.log('unassigned');
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
