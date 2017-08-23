/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
//import { RouterStub } from '../../../testing/router-stubs';
import { Router } from '@angular/router';

import { CallService } from '../call.service';
import { CallListComponent } from './call-list.component';

describe('CallListComponent', () => {

	let comp: CallListComponent;
	let _cs: any;

	beforeEach(() => {
		_cs = new StubService as any as CallService;
		//comp = new CallListComponent(_cs);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
		
	it('should fetch the Call list', () => {
	
		expect(comp.columns[0].name).toBe('ID');
		expect(comp.columns[0].attr).toBe('id');

		expect(comp.columns[1].name).toBe('Start');
		expect(comp.columns[1].attr).toBe('scheduledStart');

		expect(comp.columns[2].name).toBe('End');
		expect(comp.columns[2].attr).toBe('scheduledEnd');

		expect(comp.columns[3].name).toBe('Outlet');
		expect(comp.columns[3].attr).toBe('outlet');

 		expect(comp.columns[4].name).toBe('Agent Name');
		expect(comp.columns[4].attr).toBe('agent');

  	expect(comp.columns[5].name).toBe('Status');
		expect(comp.columns[5].attr).toBe('status');   

  	expect(comp.columns[6].name).toBe('Creation Date');
		expect(comp.columns[6].attr).toBe('creationDate'); 

		expect(comp.columns.length).toBe(7);
	});
});

class StubService {
	call: any;
	
	constructor() {
		this.call = [
			{
          uid: 63,
          id: "C0006/1481799082937",
          scheduledStart: "2016-12-15T16:21:23",
          scheduledEnd: "2016-12-15T16:21:44",
          mpt_StatusEnum: 6,
          creationDate: "2016-12-15T16:25:00.69",
          expiryDate: null,
          Outlet: "Walukarama FG",
          Agent: "Michael Tan",
          Status: "Completed",
          Key: "1410|63"
			},
			{
          uid: 64,
          id: "C0006/1481799082937",
          scheduledStart: "2016-12-15T16:21:23",
          scheduledEnd: "2016-12-15T16:21:44",
          mpt_StatusEnum: 6,
          creationDate: "2016-12-15T16:25:00.69",
          expiryDate: null,
          Outlet: "Walukarama FG",
          Agent: "Michael Tan",
          Status: "Completed",
          Key: "1410|63"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.call);
	}
}
