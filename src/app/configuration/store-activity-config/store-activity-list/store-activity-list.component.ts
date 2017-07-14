import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable } from 'angularfire2';

import { StoreActivityConfigService } from '../store-activity-config.service';
@Component({
	selector: 'app-store-activity-list',
	templateUrl: './store-activity-list.component.html',
	styleUrls: ['./store-activity-list.component.css']
})
export class StoreActivityListComponent implements OnInit {

	title: string;
	url: string;
	storeActivity: any[];
	columns: any[];
	rows: any[];
	constructor(private _sas: StoreActivityConfigService) {
		this.rows = [];
	}

	ngOnInit() {

		this._sas.all().then((storeActivity) => {
			this.storeActivity = storeActivity;
			this.updateRows();
		});

		this.title = 'Store Activity';
		this.url = '/configuration/activities/store/';
		this.columns = [
			{ name: 'Id', attr: 'id', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priority', attr: 'priority', type: 'number' }


		];
	}

	private updateRows() {
		this.rows = [];
		this.storeActivity.forEach(element => {
			this.rows.push({
				id: element.id,
				description: element.description,
				priority: element.priority,
				expiryDate: element.expiryDate,
			});
		});
	}

}
