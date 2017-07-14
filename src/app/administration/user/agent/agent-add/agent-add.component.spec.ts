/* tslint:disable:no-unused-variable */

import { Router } from '@angular/router';
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { AgentAddComponent } from './agent-add.component';
import { AgentService } from '../agent.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

import { RouterStub } from '../../../../../testing/router-stubs';

describe('Component: AgentAdd w/o Angular TestBed', () => {

  	let comp: AgentAddComponent;
	let _es: any;
	let _as: any;
	let router: Router;
	let formSubmitEvent: FormSubmitEvent;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_as = new StubService as any as AgentService;
		comp = new AgentAddComponent(router, _as, _es);

		formSubmitEvent = new FormSubmitEvent();
	});

	it('should have 3 form elements', () => {
		expect(comp.formElements.length).toBe(3);
	});

	it('should check whether submit works',()=> {
		const newUsername = '5';
		comp.formElements[0].value = newUsername;

		const newPassword = 'Soap';
		comp.formElements[1].value = newPassword;

		let newAgent: any = {
			'username': comp.formElements[0].value,	
			'password': comp.formElements[1].value
		};

		formSubmitEvent.formObject = newAgent;

		comp.submit(formSubmitEvent);
		expect(_as.users.length).toEqual(3, 'service array has been updated');
	});
});

class StubService {
	agents: any;
	
	constructor() {
		this.agents = [
			{
				username: "ichorville",
				password: "12345"
			},
			{
				username: "ironhide",
				password: "334442dq"
			}
		];
	}
	
	create(agent: any): Promise<any> {
		this.agents.push(agent);
		return Promise.resolve(agent);
	}		
}