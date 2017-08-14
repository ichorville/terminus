import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { CustomerMasterService } from '../customer-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
	taskEdit: boolean;
	taskDelete: boolean;
	customers: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;
	addButton: boolean;

	constructor(
		private _cms: CustomerMasterService,
		private router: Router
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.rows = [];
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}	
		this._cms.all().then((customers) => {
			this.customers = customers;
			this.updateRows();
		});
		this.title = 'Customers';
		this.url = '/master-data/customers/';
		this.columns = [
			{ name: 'Customer Name', attr: 'name', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
			console.log(deleteEvent);
			this._cms.remove(deleteEvent.id).then((status) => {
			if(status == 200) {
				this._cms.all().then((customers) => {
					this.customers = customers;
					this.updateRows();
				});
			} else 
			{
				alert('Could not delete due to error' + status);
			}
		});
	}

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
