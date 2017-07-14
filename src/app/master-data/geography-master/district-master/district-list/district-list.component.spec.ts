/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DistrictListComponent } from './district-list.component';
import {DistrictMasterService} from '../district-master.service'; 
import {RegionMasterService} from '../../region-master/region-master.service';
import {CountryMasterService} from '../../country-master/country-master.service';
import {TownMasterService} from '../../town-master/town-master.service'

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: DistrictList', () => {

	let comp: DistrictListComponent;
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
			comp = new DistrictListComponent(_cms,_rms,_dms, _tms);

			formSubmitEvent = new FormSubmitEvent();
			comp.ngOnInit();
		});

		it('should create an instance', () => {
				expect(comp).toBeTruthy();
		});

		it('should fetch the district list', () => {
	
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('districtId');

		expect(comp.columns[1].name).toBe('District');
		expect(comp.columns[1].attr).toBe('district');

		expect(comp.columns[2].name).toBe('Region');
		expect(comp.columns[2].attr).toBe('region');;

		expect(comp.columns[3].name).toBe('Country');
		expect(comp.columns[3].attr).toBe('country');;

		expect(comp.columns.length).toBe(4);
	});
});

class StubService {
	district: any;
	
	constructor() {
		this.district = [
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
		return Promise.resolve(this.district);
	}
}