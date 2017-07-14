/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';

import { AgentListComponent } from './agent-list.component';
import { AgentService } from '../agent.service';

import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';

describe('Component: AgentList w/o Angular TestBed', () => {

  	let comp: AgentListComponent;
	let _as: any;
	let _es: any;

	beforeEach(() => {
		_as = new StubService as any as AgentService;
		comp = new AgentListComponent(_as, _es);

		comp.ngOnInit();
	});

	it('should create an instance', () => {
		expect(comp).toBeTruthy();
	});

	it('should fetch the agent-list', () => {
		expect(comp.columns[0].name).toBe('Agent Id');
		expect(comp.columns[0].attr).toBe('agentId');

		expect(comp.columns[1].name).toBe('Description');
		expect(comp.columns[1].attr).toBe('description');

		expect(comp.columns[2].name).toBe('Employee');
		expect(comp.columns[2].attr).toBe('employee');

		expect(comp.columns.length).toBe(3);
	});
});

class StubService {
	agents: any;
	
	constructor() {
		this.agents = [
			{
				uid: 7,
				firstName: 'hasith',
				lastName: 'Thenuwara The',
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.agents);
	}
}