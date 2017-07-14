/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RegionListComponent } from './region-list.component';
import{RegionMasterService} from '../region-master.service'; 
import{CountryMasterService} from '../../country-master/country-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: RegionList', () => {

	let comp: RegionListComponent;
	let _rms: any;
	let _cms: any;
	let _dms: any;
	let formSubmitEvent: FormSubmitEvent;

		beforeEach(() => {
			_cms = new StubService as any as CountryMasterService;
			_rms = new StubService as any as RegionMasterService;
			comp = new RegionListComponent(_cms,_rms, _dms);

			formSubmitEvent = new FormSubmitEvent();
			comp.ngOnInit();
		});

		it('should create an instance', () => {
				expect(comp).toBeTruthy();
		});

		it('should fetch the region list', () => {
	
		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('regionId');

		expect(comp.columns[1].name).toBe('Region');
		expect(comp.columns[1].attr).toBe('region');

		expect(comp.columns[2].name).toBe('Country');
		expect(comp.columns[2].attr).toBe('country');;

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	region: any;
	
	constructor() {
		this.region = [
			{
				id: 1,
				uid: 10,
				description: "region 1 ",
				parentUid: 1
			},
			{
				id: 2,
				uid: 11,
				description: "region 2",
				parentUid: 2
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.region);
	}
}