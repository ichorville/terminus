import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { AssetSupplierMasterService } from '../asset-supplier-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-asset-supplier-list',
	templateUrl: './asset-supplier-list.component.html',
	styleUrls: ['./asset-supplier-list.component.css']
})
export class AssetSupplierListComponent implements OnInit {
	
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	suppliers: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private router: Router,
		private _asms: AssetSupplierMasterService
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.rows = [];
	}

	ngOnInit() {	
		if (LoginVariable.IS_LOGGED_IN == false) {
			return this.router.navigateByUrl(`/login`);
		}
		this._asms.all().then((suppliers) => {
			this.suppliers = suppliers['t'];
			this.updateRows();
		});
		this.title = 'Suppliers';
		this.url = '/master-data/suppliers/';
		this.columns = [
			{ name: 'ID', attr: 'supplierId', type: 'string' },
			{ name: 'Supplier Name', attr: 'name', type: 'string' },
			{ name: 'Last Modified', attr: 'modified', type: 'string' },
			{ name: 'Expiry Date', attr: 'expiry', type: 'string' },
			{ name: 'Region', attr: 'region', type: 'string' },
			{ name: 'Address', attr: 'address', type: 'string' },

		];
	}

	delete(deleteEvent: DeleteEvent) {
		// this._cms.remove(deleteEvent.id).then((status) => {
		// 	if (status == 200) {
		// 		this._cms.all().then((customers) => {
		// 			this.customers = customers;
		// 			this.updateRows();
		// 		});
		// 	} else {
		// 		alert('Could not delete due to error' + status);
		// 	}
		// });
	}

	private updateRows() {
		this.rows = [];
		this.suppliers.forEach(element => {
			this.rows.push({
				id: element.AreaUID,
				supplierId: element.ID,
				name: element.Name,
				modified: element.LastModifiedDate,
				expiry: element.ExpiryDate,
				region: element.Region,
				address: element.StreetAddress
			});
		});
	}
}