import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { OutletMasterService } from '../outlet-master.service';
import { OutletClassService } from '../../../configuration/outlet-config/outlet-class/outlet-class.service';
import { CustomerMasterService } from '../../customer-master/customer-master.service';

import { LoginVariable } from '../../../global';

@Component({
	selector: 'app-outlet-list',
	templateUrl: './outlet-list.component.html',
	styleUrls: ['./outlet-list.component.css']
})
export class OutletListComponent implements OnInit {

	test = false;

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	outlets: any[];
	classMap: any;
	districtMap: any;
	townMap: any;
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private _oms: OutletMasterService,
		private _cms: CustomerMasterService,
		private _ocs: OutletClassService,
		private router: Router
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.rows = [];
		this.districtMap = {};
		this.townMap = {};
		this.classMap = {};
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this._oms.all().then(outlets => {
			this.outlets = outlets['t'];
			this.updateRows();
		});

		this.title = 'Outlets';
		this.url = '/master-data/outlets/';
		this.columns = [
			{ name: 'Outlet Id', attr: 'outletId', type: 'number' },
			{ name: 'Name', attr: 'name', type: 'string' },
			{ name: 'Visit Frequency', attr: 'visitFrequency', type: 'string' },
			{ name: 'Street Address', attr: 'streetAddress', type: 'string' },
			{ name: 'City', attr: 'city', type: 'string' },
			{ name: 'Class', attr: 'class', type: 'string' },
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete not implemented by server');
		/*this._oms.remove(deleteEvent.id).then((status) => {
			if (status == 200) {
				console.log(status);
				this._oms.all().then(outlets => {
					this.outlets = outlets;
					this.updateRows();
				});
			} else {
				alert('Could not delete due to error: ' + status);
			}
		});*/
	}

	private updateRows() {
		this.rows = [];
		this.outlets.forEach(element => {
			this.rows.push({
				id: element.Uid,
				outletId: element.Id,
				name: element.Name,
				visitFrequency: element.VisitFrequency,
				streetAddress: element.StreetAddress,
				city: element.Town,
				class: element.Class
			});
		});
		this.test = true;
	}
}
