import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';

//import { CustomerMasterService } from '../asset-s';

@Component({
  selector: 'app-new-assets-list',
  templateUrl: './new-assets-list.component.html',
  styleUrls: ['./new-assets-list.component.css']
})

export class NewAssetsListComponent implements OnInit {
	customers: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		//private _cms: CustomerMasterService
	) {
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */		
		// this._cms.all().then((customers) => {
		// 	this.customers = customers;
		// 	this.updateRows();
	//	});
		this.title = 'Facility requests';
		this.url = '/transactions/newassets';
		this.columns = [
			{ name: 'Location ID', attr: 'outletId', type: 'number' },
			{ name: 'Location Name', attr: 'name', type: 'string' },
      { name: 'Street Address', attr: 'streetAddress', type: 'string' },
			{ name: 'Asset type', attr: 'assetType', type: 'string' },
			{ name: 'Requested by', attr: 'requestedBy', type: 'string' },
			{ name: 'Requested date', attr: 'requestedDate', type: 'string' },
			{ name: 'Supplier name', attr: 'supplierName', type: 'string' },
      { name: 'Approved by', attr: 'approvedBy', type: 'string' },
      { name: 'Approved date', attr: 'approvedDate', type: 'string' },
		];
	}

	// delete(deleteEvent: DeleteEvent) {
	// 		console.log(deleteEvent);
	// 		// this._cms.remove(deleteEvent.id).then((status) => {
	// 		// if(status == 200) {
	// 		// 	this._cms.all().then((customers) => {
	// 		// 		this.customers = customers;
	// 		// 		this.updateRows();
	// 		// 	});
	// 		} else 
	// 		{
	// 			alert('Could not delete due to error' + status);
	// 		}
	// 	});
	// }

	private updateRows() {
		this.rows = [];
		this.customers.forEach(element => {
			this.rows.push({
				id: element.Uid,
				name: element.Name
			});
		});
	}
}


// export class AssetSupplierListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
