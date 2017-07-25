import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';

@Component({
  selector: 'app-asset-type-list',
  templateUrl: './asset-type-list.component.html',
  styleUrls: ['./asset-type-list.component.css']
})

export class AssetTypeListComponent implements OnInit {
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
		this.title = 'Facility types';
		this.url = '/master-data/asset-types';
		this.columns = [
			{ name: 'type', attr: 'name', type: 'string' }
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
