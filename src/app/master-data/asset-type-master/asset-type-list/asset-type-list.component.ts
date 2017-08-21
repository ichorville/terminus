import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { AssetTypeMasterService } from '../asset-type-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-asset-type-list',
	templateUrl: './asset-type-list.component.html',
	styleUrls: ['./asset-type-list.component.css']
})
export class AssetTypeListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	types: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private router: Router,
		private _atms: AssetTypeMasterService
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
		this._atms.all().then((types) => {
			this.types = types;
			this.updateRows();
		});
		this.title = 'Facility Types';
		this.url = '/master-data/asset-types';
		this.columns = [
			{ name: 'Type', attr: 'name', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		this._atms.remove(deleteEvent.id).then((status) => {
			if(status == 200) {
				this._atms.all().then((types) => {
					this.types = types;
					this.updateRows();
				});
			} else {
				alert('Could not delete due to error' + status);
			}
		});
	}

	private updateRows() {
		this.rows = [];
		this.types.forEach(element => {
			this.rows.push({
				id: element.Uid,
				name: element.Name
			});
		});
	}
}