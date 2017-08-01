import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { ProductGroupService } from '../product-group.service';

@Component({
	selector: 'app-product-group-list',
	templateUrl: './product-group-list.component.html',
	styleUrls: ['./product-group-list.component.css']
})
export class ProductGroupListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	productGroups: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;;

	constructor(
		private _pgs: ProductGroupService
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */
		this._pgs.all().then((productGroups) => {
			this.productGroups = productGroups['t'];
			this.updateRows();
		});
		this.title = 'Product Group';
		this.url = '/configuration/products/groups/';
		this.columns = [
			{ name: 'Product Group Id', attr: 'productId', type: 'number' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priotiry', attr: 'priority', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not Implemented yet');
		// this._pgs.remove(deleteEvent.id).then((status) => {
		// 	if(status == 200) {
		// 		this._pgs.all().then((productGroups) => {
		// 			this.productGroups = productGroups;
		// 			this.updateRows();
		// 		});
		// 	} else {
		// 		alert('Could not delete due to error' + status);
		// 	}
		// });
	}

	private updateRows() {
		this.rows = [];
		this.productGroups.forEach(element => {
			this.rows.push({
				id: element.Uid,
				productId: element.Id,
				description: element.Description,
				priority: element.Priority
			});
		});
	}
}
