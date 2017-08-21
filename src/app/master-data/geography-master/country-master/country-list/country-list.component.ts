import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';
import { CountryMasterService } from '../country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';

import { fadeInAnimation } from '../../../../shared/animations/fade-in.animation';

import { LoginVariable } from '../../../../global';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class CountryListComponent implements OnInit {

	countries: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;
	deleteValue: number;
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	constructor(
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private router: Router
	) {
		this.rows = [];
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}	
		this._cms.all().then((countries) => {
			this.countries = countries;
			this.updateRows();
		});
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
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
