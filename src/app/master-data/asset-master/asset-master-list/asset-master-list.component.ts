import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { AssetMasterService } from '../asset-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-asset-master-list',
	templateUrl: './asset-master-list.component.html',
	styleUrls: ['./asset-master-list.component.css']
})
export class AssetMasterListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	assets: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private router: Router,
		private _ams: AssetMasterService
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
		this._ams.all().then((assets) => {
			this.assets = assets;
			this.updateRows();
		});
		this.title = 'Facilities';
		this.url = '/master-data/assets/';
		this.columns = [
			{ name: 'Facility Name', attr: 'name', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		// this._ams.remove(deleteEvent.id).then((status) => {
		// 	if(status == 200) {
		// 		this._ams.all().then((assets) => {
		// 			this.assets = assets;
		// 			this.updateRows();
		// 		});
		// 	} else {
		// 		alert('Could not delete due to error' + status);
		// 	}
		// });
	}

	private updateRows() {
		this.rows = [];
		this.assets.forEach(element => {
			this.rows.push({
				id: element.Uid,
				name: element.Name
			});
		});
	}
}
