import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';
import { CountryMasterService } from '../country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

	countries: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;
	deleteValue: number;

	constructor(
		private _cms: CountryMasterService,
		private _rms: RegionMasterService
	) {
		this.rows = [];
	}

	ngOnInit() {
		/**
		 * Get all entities and load all entities
		 */		
		this._cms.all().then((countries) => {
			this.countries = countries;
			this.updateRows();
		});
		this.title = 'Countries';
		this.url = '/master-data/geographies/countries/';
		this.columns = [
			{ name: 'Id', attr: 'countryId', type: 'string' },
			{ name: 'Country', attr: 'name', type: 'string' },
		];
	}

	delete(deleteEvent: DeleteEvent) {
		this.deleteValue = 0;
		this._rms.all().then((region) => {
			region.forEach((element) => {
				if (element.ParentUid == deleteEvent.id) {
					alert('Country Cannot be Deleted');
					this.deleteValue = 1;
				}
			});
			if (this.deleteValue == 0) {
				alert('Country Deleted');
				/*this._cms.remove(deleteEvent.id).then((status) => { 
					if(status == 200) {
						this._cms.all().then((country) => {
								this.countries = country;
								this.updateRows();
						});
					} else 
					{
						alert('Could not delete due to error' + status);
					}
 				});  */
			}
		});
	}

	private updateRows() {
		this.rows = [];
		this.countries.forEach(element => {
			this.rows.push({
				id: element.Uid,
				countryId: element.Id,
				name: element.Description,
			});
		});
	}
}
