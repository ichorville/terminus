import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable } from 'angularfire2';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';

//import { CustomerMasterService } from '../asset-s';

@Component({
  selector: 'app-asset-supplier-list',
  templateUrl: './asset-supplier-list.component.html',
  styleUrls: ['./asset-supplier-list.component.css']
})

export class AssetSupplierListComponent implements OnInit {
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
		this.title = 'Suppliers';
		this.url = '/master-data/suppliers/';
		this.columns = [
			{ name: 'Supplier Name', attr: 'name', type: 'string' }
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
