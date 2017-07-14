import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { OutletTypeService } from '../outlet-type.service';

@Component({
	selector: 'app-outlet-type-list',
	templateUrl: './outlet-type-list.component.html',
	styleUrls: ['./outlet-type-list.component.css']
})
export class OutletTypeListComponent implements OnInit {

	outletTypes: any;
	rows: any[];
	url: string;
	columns: any[];
	title: string;;

	constructor( private _ots: OutletTypeService ) {
		this.rows = [];
	}

	ngOnInit() {
		this._ots.all().then((outletTypes) => {
			this.outletTypes = outletTypes['t'];
			this.updateRows();
		});
		this.title = 'Outlet Types';
		this.url = '/configuration/outlets/types/';
		this.columns = [
			{ name: 'Outlet type Id', attr: 'typeId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priority', attr: 'priority', type: 'string' }
		];
	}
	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet');
	/*	this._ots.remove(deleteEvent.id).then((status) => {
			if(status == 200) {
				this._ots.all().then((outletTypes) => {
					this.outletTypes = outletTypes;
					this.updateRows();
				});
			} else {
				alert('Could not delete due to error' + status);	
			}
		});    */
	}

	private updateRows() {
		this.rows = [];
		this.outletTypes.forEach(element => {
			this.rows.push({
				id: element.Uid,
				typeId: element.Id,
				description: element.Description,
				priority: element.Priority
			});
		});
	}
}
