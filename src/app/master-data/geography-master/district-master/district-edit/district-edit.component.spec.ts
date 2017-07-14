import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import {
	RouterStub, ActivatedRoute,
	ActivatedRouteStub
} from '../../../../../testing/router-stubs';
import { Router } from '@angular/router';

import { DistrictEditComponent } from './district-edit.component';
import { CountryMasterService } from '../../country-master/country-master.service';
import {RegionMasterService} from '../../region-master/region-master.service';
import { DistrictMasterService } from '../district-master.service';
import { TownMasterService } from '../../town-master/town-master.service';

describe('Component: DistrictEdit', () => {

	let comp: DistrictEditComponent;
	let _cms: any;
	let _rms: any;
	let _dms: any;
	let _tms: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		_dms = new StubService as any as DistrictMasterService;
		comp = new DistrictEditComponent(router, activatedRoute, _cms, _rms, _dms, _tms)

		//populate fields as existing data loads on view
		comp.formElements[2].value = _dms.district[0].Id;
		comp.formElements[3].value = _dms.district[0].Description;
		formSubmitEvent = new FormSubmitEvent();;
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should have 4 formElements', () => {
		expect(comp).toBeTruthy(4);
	});

	it('should check whether submit works', () => {

		const newId = '4';
		comp.formElements[2].value = newId;

		const newDescription = '30';
		comp.formElements[3].value = newDescription;

		let newValue: any = {
			'uid': 1,
			'id': comp.formElements[2].value,
			'description': comp.formElements[3].value,
			'parentUid': 2,
		};

		formSubmitEvent.formObject = newValue;
		comp.submit(formSubmitEvent);
		expect(_dms.district[0].id).toEqual(newValue.id, 'existing district id has been updated');
		expect(_dms.district[0].description).toEqual(newValue.description, 'existing district name has been updated');
	});
});

class StubService {
	district: any;

	constructor() {
		this.district = [
			{
				uid: 1,
				id: '1',
				description: "district 1",
				parentUid: 2

			},
			{
				uid: 2,
				id: '2',
				description: "district 2",
				parentUid: 1
			}
		];
	}

	update(district: any): Promise<any> {
		district.uid = 1;
		let index = this.district.findIndex((element) => {
			return element.uid == district.uid;
		});
		this.district[index].id = district.id;
		this.district[index].description = district.description;
		return Promise.resolve(district);
	}
}	