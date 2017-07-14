/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { AgentEditComponent } from './agent-edit.component';
import { AgentService } from '../agent.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub, ActivatedRoute, 
  	ActivatedRouteStub } from '../../../../../testing/router-stubs';

describe('Component: AgentEdit w/o Angular TestBed', () => {
  
	let comp: AgentEditComponent;
	let _as: any;
	let _es: any;
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(async(() => { 
		router = new RouterStub as any as Router;
		_as = new StubService as any as AgentService;
		activatedRoute = new ActivatedRoute as any as ActivatedRoute;
		comp = new AgentEditComponent(router, activatedRoute, _as, _es,);

		// populate feilds as exhisting data loads on view
		comp.formElements[0].value = _as.agents[0].name;
		comp.formElements[1].value = _as.agents[0].description;

		formSubmitEvent = new FormSubmitEvent();
	}));

  	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {

		const newUsername = 'Jay';
		comp.formElements[1].value = newUsername;

		const newEmployee = 'Mc';
		comp.formElements[2].value = newEmployee;

		let newUser: any = {
			'uid': 1,
			'username': comp.formElements[0].value,	
			'employee': comp.formElements[1].value,			
		};
		formSubmitEvent.formObject = newUser;

		comp.submit(formSubmitEvent);
		expect(_as.agents[0].username).toEqual(newUser.username, 'exhisting user username has been updated');
		expect(_as.agents[0].employee).toEqual(newUser.employee, 'exhisting User employee has been updated');
	});
});

class StubService {
	agents: any;
	
	constructor() {
		this.agents = [
			{
				uid: 1,
				username: "admin123",
				employee: "Lee Chen"
			},
			{
				uid: 4,
				username: "shazam",
				employee: "Shazam"
			}
		];
	}
	
	update(agent: any): Promise<any> {
		agent.uid = 1;
		// uid is set hence it's not extracted from comp
		let index = this.agents.findIndex((element) => {
			return element.uid == agent.uid;
		});
		this.agents[index].username = agent.username;
		this.agents[index].employee = agent.employee;
		return Promise.resolve(agent);
	}		
}