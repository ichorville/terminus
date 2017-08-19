import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../district-master.service';
import { TownMasterService } from '../../town-master/town-master.service';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-district-list',
	templateUrl: './district-list.component.html',
	styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {

	districts: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;
	countriesMap: any;
	regionsMap: any;
	deleteValue: number;
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	constructor(
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService,
		private router: Router
	) {
		this.countriesMap = {};
		this.regionsMap = {};
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
				regions.forEach(element => {
					if (element.ParentUid != null && this.countriesMap[element.ParentUid] != undefined) {
						this.regionsMap[element.Uid] = {
							country: this.countriesMap[element.ParentUid],
							region: element.Description,
						};
					}
				});
				this._dms.all().then((districts) => {
					this.districts = districts;
					this.updateRows();
				});
			});
		});
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.title = 'Districts';
		this.url = '/master-data/geographies/districts/';
		this.columns = [
			{ name: 'Id', attr: 'districtId', type: 'string' },
			{ name: 'District', attr: 'district', type: 'string' },
			{ name: 'Region', attr: 'region', type: 'string' },
			{ name: 'Country', attr: 'country', type: 'string' },
		];
	}

	delete(deleteEvent: DeleteEvent) {
		this.deleteValue = 0;
		this._tms.all().then((town) => {
			town.forEach((element) => {
				if (element.parentUid == deleteEvent.id) {
					alert('District Cannot be Deleted');
					this.deleteValue = 1;
				}
			});
			if (this.deleteValue == 0) {
				alert('District Deleted');
				/*this._dms.remove(deleteEvent.id).then((status) => { 
					if(status == 200) {
						this._dms.all().then((district) => {
								this.districts = district;
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
		this.districts.forEach(element => {
			if (element.ParentUid != null && this.regionsMap[element.ParentUid] != null) {
				this.rows.push({
					id: element.Uid,
					districtId: element.Id,
					district: element.Description,
					region: this.regionsMap[element.ParentUid].region,
					country: this.regionsMap[element.ParentUid].country
				});
			}
		});
	}
}
