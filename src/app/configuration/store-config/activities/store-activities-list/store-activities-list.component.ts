import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';
import { StoreActivitiesService } from '../activities.service';

import { LoginVariable } from '../../../../global';

@Component({
  selector: 'app-store-activities-list',
  templateUrl: './store-activities-list.component.html',
  styleUrls: ['./store-activities-list.component.css']
})
export class StoreActivitiesListComponent implements OnInit {
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	title: string;
	url: string;
	storeActivity: any[];
	columns: any[];
	rows: any[];

	constructor(
		private _sas: StoreActivitiesService,
		private router: Router
	) {
		this.rows = [];
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this._sas.all().then((storeActivity) => {
			this.storeActivity = storeActivity['t'];
			this.updateRows();
		});

		this.title = 'Store Activity';
		this.url = '/configuration/store/activities/';
		this.columns = [
			{ name: 'Store Activity Id', attr: 'activityId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priority', attr: 'priority', type: 'number' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet');
	/*	this._sas.remove(deleteEvent.id).then((status) => {
				if(status == 200) {
					this._sas.all().then((storeActivity) => {
						this.storeActivity = storeActivity;
						this.updateRows();
					});
				} else 
				{
					alert('Could not delete due to error' + status);
				}
			});   */
	}
	
	private updateRows() {
		this.rows = [];
		this.storeActivity.forEach(element => {
			this.rows.push({
				id:element.Uid,
				activityId: element.Id,
				description: element.Description,
				priority: element.Priority,
				expiryDate: element.ExpiryDate,
			});
		});
	}
}
