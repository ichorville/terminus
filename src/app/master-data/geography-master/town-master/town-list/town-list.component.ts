import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { CountryMasterService } from '../../country-master/country-master.service';
import { RegionMasterService } from '../../region-master/region-master.service';
import { DistrictMasterService } from '../../district-master/district-master.service';
import { TownMasterService } from '../town-master.service';

import { fadeInAnimation } from '../../../../shared/animations/fade-in.animation';

import { LoginVariable } from '../../../../global';

@Component({
	selector: 'app-town-list',
	templateUrl: './town-list.component.html',
	styleUrls: ['./town-list.component.css'],
	animations: [fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class TownListComponent implements OnInit {

	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	towns: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	countriesMap: any;
	regionsMap: any;
	districtMap: any;

	constructor(
		private _cms: CountryMasterService,
		private _rms: RegionMasterService,
		private _dms: DistrictMasterService,
		private _tms: TownMasterService,
		private router: Router
	) {
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
		this.countriesMap = {};
		this.regionsMap = {};
		this.districtMap = {};
		this.rows = [];
		this.towns = [];
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
							region: element.Description
						};
					}
				});
				this._dms.all().then((districts) => {
					districts.forEach(element => {
						if (element.ParentUid != null && this.regionsMap[element.ParentUid] != undefined) {
							this.districtMap[element.Uid] = {
								country: this.regionsMap[element.ParentUid].country,
								region: this.regionsMap[element.ParentUid].region,
								district: element.Description,
							}
						}
					});
					this._tms.all().then((towns) => {
						this.towns = towns;
						this.updateRows();
					});
				});
			});
		});
		this.title = 'Towns';
		this.url = '/master-data/geographies/towns/';
		this.columns = [
			{ name: 'Id', attr: 'townId', type: 'string' },
			{ name: 'Town', attr: 'town', type: 'string' },
			{ name: 'District', attr: 'district', type: 'string' },
			{ name: 'Region', attr: 'region', type: 'string' },
			{ name: 'Country', attr: 'country', type: 'string' },
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete not implemented in API');		
	/*	this._tms.remove(deleteEvent.id).then((status) => { 
			if(status == 200) {
				this._tms.all().then((towns) => {
					this.towns = towns;
					this.updateRows();
				});
			} else 
			{
				alert('Could not delete due to error' + status);
			}
		});    */		    
	}

	private updateRows() {
		this.rows = [];
		this.towns.forEach(element => {
			if (element.ParentUid != null && this.districtMap[element.ParentUid] != null) {
				this.rows.push({
					id: element.Uid,
					townId: element.Id,
					town: element.Description,
					district: this.districtMap[element.ParentUid].district,
					region: this.districtMap[element.ParentUid].region,
					country: this.districtMap[element.ParentUid].country
				});
			}
		});
	}
}
