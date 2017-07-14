/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TownListComponent } from './town-list.component';
import {TownMasterService} from '../town-master.service'; 

import {DistrictMasterService} from '../../district-master/district-master.service'; 
import {RegionMasterService} from '../../region-master/region-master.service';
import {CountryMasterService} from '../../country-master/country-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: Townt', () => {

	let comp: TownListComponent;
	let _tms: any;
	let _dms: any;
	let _rms: any;
	let _cms: any;
	let formSubmitEvent: FormSubmitEvent;

		beforeEach(() => {
			_cms = new StubService as any as CountryMasterService;
			_rms = new StubService as any as RegionMasterService;
			_dms = new StubService as any as DistrictMasterService;
			_tms = new StubService as any as TownMasterService;
			comp = new TownListComponent(_cms,_rms,_dms, _tms);

			formSubmitEvent = new FormSubmitEvent();
			comp.ngOnInit();
		});

		it('should create an instance', () => {
				expect(comp).toBeTruthy();
		});

		it('should fetch the town list', () => {
	
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('townId');

		expect(comp.columns[1].name).toBe('Town');
		expect(comp.columns[1].attr).toBe('town');

		expect(comp.columns[2].name).toBe('District');
		expect(comp.columns[2].attr).toBe('district');;

		expect(comp.columns[3].name).toBe('Region');
		expect(comp.columns[3].attr).toBe('region');;

		expect(comp.columns[4].name).toBe('Country');
		expect(comp.columns[4].attr).toBe('country');;

		expect(comp.columns.length).toBe(5);
		});
});

class StubService {
	town: any;
	
	constructor() {
		this.town = [
			{
				id: 1,
				uid: 10,
				description: "description 1 ",
				parentUid: 1
			},
			{
				id: 2,
				uid: 11,
				description: "description 2",
				parentUid: 2
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.town);
	}
}