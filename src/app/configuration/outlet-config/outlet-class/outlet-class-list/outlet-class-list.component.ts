import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { OutletClassService } from '../outlet-class.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-outlet-class-list',
	templateUrl: './outlet-class-list.component.html',
	styleUrls: ['./outlet-class-list.component.css']
})
export class OutletClassListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	outletClasses: any;
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private _ocs: OutletClassService,
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
		this._ocs.all().then((outletClasses) => {
			this.outletClasses = outletClasses['t'];
			this.updateRows();
		});
		this.title = 'Outlet Classes';
		this.url = '/configuration/outlets/classes/';
		this.columns = [
			{ name: 'Outlet Class Id', attr: 'classId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priority', attr: 'priority', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet');
	/*	this._ocs.remove(deleteEvent.id).then((status) => {
			if(status == 200) {
				this._ocs.all().then((outletClasses) => {
					this.outletClasses = outletClasses;
					this.updateRows();
				});
			} else {
				alert('Could not delete due to error' + status);
			}
		});    */
	}

	private updateRows() {
		this.rows = [];
		this.outletClasses.forEach(element => {
			this.rows.push({
				id: element.Uid,
				classId: element.Id,
				description: element.Description,
				priority: element.Priority
			});
		});
	}
}
