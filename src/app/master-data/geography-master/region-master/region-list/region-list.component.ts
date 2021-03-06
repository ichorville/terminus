import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../region-master.service';
import { DistrictMasterService } from '../../district-master/district-master.service';

import { fadeInAnimation } from '../../../../shared/animations/fade-in.animation';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-region-list',
	templateUrl: './region-list.component.html',
	styleUrls: ['./region-list.component.css'],
	animations: [fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class RegionListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	regions: any[];
	url: string;
	rows: any[];
	columns: any[];
	title: string;
	countriesMap: any;
	deleteValue: number;

	constructor(
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private router: Router
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.countriesMap = {};
		this.rows = [];
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}	
		this._cms.all().then((countries) => {
			countries.forEach((element) => {
				this.countriesMap[element.Uid] = element.Description;
			});
			this._rms.all().then((regions) => {
				this.regions = regions;
				this.updateRows();
			});			
		});
		this.title = 'Regions';
		this.url = '/master-data/geographies/regions/';
		this.columns = [
			{ name: 'Id', attr: 'regionId', type: 'string' },
			{ name: 'Region', attr: 'region', type: 'string' },
			{ name: 'Country', attr: 'country', type: 'string' },
		];
	}

	delete(deleteEvent: DeleteEvent) {
		this.deleteValue = 0;
		this._dms.all().then((district) => {
			district.forEach((element) => {
				if (element.ParentUid == deleteEvent.id) {
					alert('Region Cannot be Deleted');
					this.deleteValue = 1;
				}
			});
			if (this.deleteValue == 0) {
				alert('Region Deleted');
				/*this._rms.remove(deleteEvent.id).then((status) => { 
					if(status == 200) {
						this._rms.all().then((regions) => {
								this.regions = regions;
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
		this.regions.forEach(element => {
			this.rows.push({
				id: element.Uid,
				regionId: element.Id,
				region: element.Description,
				country: this.countriesMap[element.ParentUid]
			});
		});
	}
}
