/* tslint:disable:no-unused-variable */
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
	ActivatedRouteStub } from '../../../../../testing/router-stubs';

import { StoreLocationsEditComponent } from './store-locations-edit.component';
import {StoreLocationsService} from '../locations.service';

describe('StoreLocationEditComponent', () => {
	let comp: StoreLocationsEditComponent;
	let _sls: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_sls = new StubService as any as StoreLocationsService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new StoreLocationsEditComponent(router, activatedRoute, _sls);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _sls.storeLocation[1].id;
		comp.formElements[1].value = _sls.storeLocation[1].description;
		comp.formElements[2].value = _sls.storeLocation[1].priority;

		formSubmitEvent = new FormSubmitEvent();
	});

		it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newId = '5';
		comp.formElements[0].value = newId;

		const newDescription = 'Store Location 5';
		comp.formElements[1].value = newDescription;

		const newPriority = '5';
		comp.formElements[2].value = newPriority;

		let newStoreLocation: any = {
			'uid': _sls.storeLocation[1].uid,
			'id': comp.formElements[0].value,	
			'description': comp.formElements[1].value,	
			'priority': comp.formElements[2].value		
		};
		formSubmitEvent.formObject = newStoreLocation;

		comp.submit(formSubmitEvent);
		expect(_sls.storeLocation[1].id).toEqual(newStoreLocation.id, 'exhisting storeLocation id has not been updated');
		expect(_sls.storeLocation[1].description).toEqual(newStoreLocation.description, 'exhisting storeLocation description has not been updated');
		expect(_sls.storeLocation[1].priority).toEqual(newStoreLocation.priority, 'exhisting storeLocation priority has not been updated');
	});
});

class StubService {
	storeLocation: any;
	
	constructor() {
		this.storeLocation = [
			{
				uid: 1,
				id: 2,
				description: "location 1",
				priority: '1'
			},
			{
				uid: 2,
				id: 3,
				description: "location 2",
				priority: '2'
			}
		];
	}
	
	update(storeLocation: any): Promise<any> {
		storeLocation.uid = 2;
		let index = this.storeLocation.findIndex((element) => {
			return element.uid == storeLocation.uid;
		});
		this.storeLocation[index].id = storeLocation.id;
		this.storeLocation[index].description = storeLocation.description;
		this.storeLocation[index].priority = storeLocation.priority;
		return Promise.resolve(storeLocation);
	}		
}