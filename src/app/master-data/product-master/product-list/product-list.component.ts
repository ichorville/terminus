import { Component, OnInit } from '@angular/core';
//import { FirebaseListObservable } from 'angularfire2';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { ProductMasterService } from '../product-master.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	products: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private _pms: ProductMasterService
	) {
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */
		this._pms.all().then((products) => {
			this.products = products['t'];
			this.updateRows();
		});

		this.title = 'Products';
		this.url = '/master-data/products/';
		this.columns = [
			{ name: 'Id', attr: 'productId', type: 'string' },
			{ name: 'Name', attr: 'name', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Category', attr: 'category', type: 'string' },
			{ name: 'Group', attr: 'group', type: 'string' },
			{ name: 'Type', attr: 'type', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Not Implemented');
	/*	this._pms.remove(deleteEvent.id).then((status) => {
			if (status == 200) {
				console.log('Successfully Removed');
			} else {
				console.log(status);
			} 
		});        */
	}

	private updateRows() {
		this.rows = [];
		this.products.forEach(element => {
			this.rows.push({
				id: element.Uid,
				productId: element.Id,
				name: element.Name,
				description: element.Description,
				category: element.Category,
				group: element.GroupData,
				type: element.Type
			});
		});
	}
}