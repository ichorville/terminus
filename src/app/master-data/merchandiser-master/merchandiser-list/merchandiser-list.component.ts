import { Component, OnInit } from '@angular/core';
//import { FirebaseListObservable } from 'angularfire2';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { MerchandiserMasterService } from '../merchandiser-master.service';

@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.css']
})
export class MerchandiserListComponent implements OnInit {

	merchandisers: any[];
	groupMap: any;
	typeMap: any;
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	constructor(
		private _mms: MerchandiserMasterService
	) {
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */
		this._mms.all().then((merchandisers) => {
			this.merchandisers = merchandisers;
			this.updateRows();
		});


		this.title = 'Merchandisers';
		this.url = '/master-data/merchandisers/';
		this.columns = [
			{ name: 'Id', attr: 'uid', type: 'string' },
			{ name: 'Name', attr: 'description', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		this._mms.remove(deleteEvent.id);
	}

	private updateRows() {
		this.rows = [];
		this.merchandisers.forEach(element => {
			this.rows.push({
				uid: element.uid,
				description: element.description
			});
		});
	}
}