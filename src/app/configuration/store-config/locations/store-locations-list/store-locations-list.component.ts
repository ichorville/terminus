import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';
import { StoreLocationsService } from '../locations.service';

@Component({
  selector: 'app-store-location-list',
  templateUrl: './store-locations-list.component.html',
  styleUrls: ['./store-locations-list.component.css']
})
export class StoreLocationsListComponent implements OnInit {
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	title: string;
	url: string;
	storeLocation: any[];
	columns: any[];
	rows: any[];

	constructor(private _sas: StoreLocationsService) {
		this.rows = [];
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
	}

	ngOnInit() {
		this._sas.all().then((storeLocation) => {
			this.storeLocation = storeLocation['t'];
			this.updateRows();
		});

		this.title = 'Store Location';
		this.url = '/configuration/store/locations/';  
		this.columns = [
			{ name: 'Store Location Id', attr: 'locationId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Priority', attr: 'priority', type: 'number' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet');
	}

	private updateRows() {
		this.rows = [];
		this.storeLocation.forEach(element => {
			this.rows.push({
				id: element.Uid,
				locationId: element.Id,
				description: element.Description,
				priority: element.Priority,
				expiryDate: element.ExpiryDate,
			});
		});
	}
}
