/* tslint:disable:no-unused-variable */
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
	ActivatedRouteStub } from '../../../../../testing/router-stubs';

import { StoreActivitiesEditComponent } from './store-activities-edit.component';
import { StoreActivitiesService} from '../activities.service';

describe('StoreActivitiesEditComponent', () => {
	let comp: StoreActivitiesEditComponent;
	let _sas: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_sas = new StubService as any as StoreActivitiesService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new StoreActivitiesEditComponent(router, activatedRoute, _sas);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _sas.storeActivity[1].id;
		comp.formElements[1].value = _sas.storeActivity[1].description;
		comp.formElements[2].value = _sas.storeActivity[1].priority;

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newId = '5';
		comp.formElements[0].value = newId;

		const newDescription = 'Store Activity 5';
		comp.formElements[1].value = newDescription;

		const newPriority = '5';
		comp.formElements[2].value = newPriority;

		let newStoreActivity: any = {
			'uid': _sas.storeActivity[1].uid,
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};
		formSubmitEvent.formObject = newStoreActivity;

		comp.submit(formSubmitEvent);
		expect(_sas.storeActivity[1].id).toEqual(newStoreActivity.id, 'exhisting storeActivity id has not been updated');
		expect(_sas.storeActivity[1].description).toEqual(newStoreActivity.description, 'exhisting storeActivity description has not been updated');
		expect(_sas.storeActivity[1].priority).toEqual(newStoreActivity.priority, 'exhisting storeActivity priority has not been updated');
	});
});

class StubService {
	storeActivity: any;
	
	constructor() {
		this.storeActivity = [
			{
				uid: 1,
				id: 2,
				description: "activity 1",
				priority: '1'
			},
			{
				uid: 2,
				id: 3,
				description: "activity 2",
				priority: '2'
			}
		];
	}
	
	update(storeActivity: any): Promise<any> {
		storeActivity.uid = 2;
		let index = this.storeActivity.findIndex((element) => {
			return element.uid == storeActivity.uid;
		});
		this.storeActivity[index].id = storeActivity.id;
		this.storeActivity[index].description = storeActivity.description;
		this.storeActivity[index].priority = storeActivity.priority;
		return Promise.resolve(storeActivity);
	}		
}