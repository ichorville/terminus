import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { ProductCategoryService } from '../product-category.service';

@Component({
	selector: 'app-product-category-list',
	templateUrl: './product-category-list.component.html',
	styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	productCategories: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private _pcs: ProductCategoryService
	) { 
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.rows = [];
	}

	ngOnInit() {
		this._pcs.all().then((productCategories) => {
			this.productCategories = productCategories['t'];
			this.updateRows();
		});
		this.title = 'Product Category';
		this.url = '/configuration/products/categories/';
		this.columns = [
			{ name: 'Category Id', attr: 'categoryId', type: 'number' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Category Type', attr: 'categoryType', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet')
    /*		this._pcs.remove(deleteEvent.id).then((status) => {
			if(status == 200) {
				this._pcs.all().then((productCategories) => {
					this.productCategories = productCategories;
					this.updateRows();
				});
			} else {
				alert('Could not delete due to error' + status);
			}
		});             */
	}

	private updateRows() {
		this.rows = [];
		this.productCategories.forEach(element => {
			this.rows.push({
				id: element.Uid,
				categoryId: element.Id,
				description: element.Description,
				categoryType: element.CategoryType
			});
		});
	}
}
