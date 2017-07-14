import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { RouterStub, ActivatedRoute, 
								 ActivatedRouteStub } from '../../../../../testing/router-stubs';
import { Router } from '@angular/router';

import { RegionEditComponent } from './region-edit.component';
import {RegionMasterService} from '../region-master.service';
import {CountryMasterService} from '../../country-master/country-master.service';

describe('Component: RegionEdit', () => {

	let comp: RegionEditComponent;
	let _cms : any;  
	let _rms : any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent : FormSubmitEvent;

	beforeEach(()=>{
		router = new RouterStub as any as Router;
		_rms = new StubService as any as RegionMasterService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new RegionEditComponent(router,activatedRoute, _cms, _rms);

		// populate feilds as exhisting data loads on view
		comp.formElements[1].value = _rms.region[0].Id;
		comp.formElements[2].value = _rms.region[0].Description;
		formSubmitEvent = new FormSubmitEvent();
	});

	
	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newId = '4';
		comp.formElements[1].value = newId;  

		const newDescription = 'region 4';
		comp.formElements[2].value = newDescription;

		let newValue: any = {
			'uid': 1,
			'id': comp.formElements[1].value,	
			'description': comp.formElements[2].value,
			'parentUid': 1
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_rms.region[0].id).toEqual(newValue.id, 'existing region id has been updated');
		expect(_rms.region[0].description).toEqual(newValue.description, 'existing region name has been updated');
	});
});

class StubService {
	region: any;
	
	constructor() {
		this.region = [
			{
				parentUid: 20,
				id: 1,
				description: "region 1 ",
				uid: 1	
			},
			{
				id: 2,
				description: "region 2",
				uid: 2,
				parentUid: 20
			}
		];
	}
	
	update(region: any): Promise<any> {
		region.uid = 1;
		let index = this.region.findIndex((element) => {
			return element.uid == region.uid;
		});
		this.region[index].id = region.id;
		this.region[index].description = region.description;
		return Promise.resolve(region);
	}		
}