/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CountryListComponent } from './country-list.component';
import{CountryMasterService} from '../country-master.service'; 
import{RegionMasterService} from '../../region-master/region-master.service'

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: CountryList', () => {

	let comp: CountryListComponent;
	let _cms: any;
	let _rms: any;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		_cms = new StubService as any as CountryMasterService;
		_rms = new StubService as any as RegionMasterService;
		comp = new CountryListComponent(_cms,_rms);

		formSubmitEvent = new FormSubmitEvent();
		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the country list', () => {

		expect(comp.columns[0].name).toBe('Id');
		expect(comp.columns[0].attr).toBe('countryId');

		expect(comp.columns[1].name).toBe('Country');
		expect(comp.columns[1].attr).toBe('name');

		expect(comp.columns.length).toBe(2);
	});
});

class StubService {
	country: any;
	
	constructor() {
		this.country = [
			{
				id: 1,
				description: "country 1 ",
				uid: 1
			},
			{
				id: 2,
				description: "country 2",
				uid: 1
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.country);
	}
}