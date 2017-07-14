import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { TownEditComponent } from './town-edit.component'
import { TownMasterService } from '../town-master.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  	ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: TownEdit w/o Angular TestBed', () => {

	let comp: TownEditComponent;
	let _cms: any;
	let _rms: any;
	let _dms: any;
	let _tms: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(async(() => { 
		router = new RouterStub as any as Router;
		_tms = new StubService as any as TownMasterService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new TownEditComponent(router, activatedRoute, _cms, _rms, _dms, _tms);

		// populate feilds as exhisting data loads on view
		comp.formElements[3].value = _tms.towns[0].Id;
		comp.formElements[4].value = _tms.towns[0].Description;

		formSubmitEvent = new FormSubmitEvent();
	}));

	it('should have 5 form elements', () => {
		expect(comp.formElements.length).toBe(5);
	});

	it('should check whether submit works',()=> {

		const newId = 'Jay';
		comp.formElements[3].value = newId;

		const newDescription = 'Mc';
		comp.formElements[4].value = newDescription;

		let newTown: any = {
			'uid': '6',
			'id': comp.formElements[3].value,	
			'description': comp.formElements[4].value,	
			'parentUid': '20'	
		};
		formSubmitEvent.formObject = newTown;

		comp.submit(formSubmitEvent);
		expect(_tms.towns[0].id).toEqual(newTown.id, 'existing town id has been updated');
		expect(_tms.towns[0].description).toEqual(newTown.description, 'existing town description has been updated');
	});
});

class StubService {
	towns: any;
	
	constructor() {
		this.towns = [
			{
				uid: 6,
				id: "Id 11",
				description: "Kalahari",
				parentUid: 6
			},
			{
				uid: 7,
				id: "Id 12",
				description: "Pandora",
				parentUid: 6
			}
		];
	}
	
	update(town: any): Promise<any> {
		town.uid = 6;
		// uid is not set hence id is used to findIndex
		let index = this.towns.findIndex((element) => {
			return element.uid == town.uid;
		});
		this.towns[index].id = town.id;
		this.towns[index].description = town.description;

		return Promise.resolve(town);
	}		
}