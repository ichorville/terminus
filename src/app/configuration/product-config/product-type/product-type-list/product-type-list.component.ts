import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { ProductTypeService } from '../product-type.service';

@Component({
	selector: 'app-product-type-list',
	templateUrl: './product-type-list.component.html',
	styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {

	productTypes: any;
	rows: any[];
	url: string;
	columns: any[];
	title: string;;

	constructor(
		private _pts: ProductTypeService
	) {
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */
		this._pts.all().then((productTypes) => {
			this.productTypes = productTypes['t'];
			this.updateRows();
		});
		this.title = 'Product Type';
		this.url = '/configuration/products/types/';
		this.columns = [
			{ name: 'Product Type Id', attr: 'typeId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priotiry', attr: 'priority', type: 'string' }
		];
	}


	delete(deleteEvent: DeleteEvent) {
		alert('Delete not Implemented Yet');
		// this._pts.remove(deleteEvent.id).then((status) => {
		// 	if(status == 200) {
		// 		this._pts.all().then((productTypes) => {
		// 			this.productTypes = productTypes;
		// 			this.updateRows();
		// 		});
		// 	} else {
		// 		alert('Could not delete due to error: ' + status);
		// 	}
		// });
	}

	private updateRows() {
		this.rows = [];
		this.productTypes.forEach(element => {
			this.rows.push({
				id: element.Uid,
				typeId: element.Id,
				description: element.Description,
				priority: element.Priority
			});
		});
	}
}
