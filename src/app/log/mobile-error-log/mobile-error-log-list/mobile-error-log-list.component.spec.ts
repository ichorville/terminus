import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../testing/router-stubs';
import { Router } from '@angular/router';

import { MobileErrorLogListComponent } from './mobile-error-log-list.component';
import { MobileErrorLogService } from '../mobile-error-log.service';

describe('Component: LoginHistoryListComponent', () => {

	let comp: MobileErrorLogListComponent;
	let _mels: any;
	let router: Router;

	beforeEach(() => {
		router = new RouterStub as any as Router;
		_mels = new StubService as any as MobileErrorLogService;
		comp = new MobileErrorLogListComponent(router,_mels);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
		
	it('should fetch the Mobile Error Log list', () => {
	
		expect(comp.columns[0].name).toBe('Name');
		expect(comp.columns[0].attr).toBe('name');

		expect(comp.columns[1].name).toBe('Message');
		expect(comp.columns[1].attr).toBe('message');

		expect(comp.columns[2].name).toBe('Description');
		expect(comp.columns[2].attr).toBe('description');

		expect(comp.columns[3].name).toBe('LogDate');
		expect(comp.columns[3].attr).toBe('logDate');

		expect(comp.columns.length).toBe(4);
	});
});

class StubService {
	MobileErrorLog: any;
	
	constructor() {
		this.MobileErrorLog = [
			{
					uid: 26169,
					name: "0005 - Merchandiser 01",
					message: "No van warehouse",
					description: "[dbo].[mob_impBeforeSyncCall]",
					logDate: "2016-09-23T15:45:06.15"
			},
			{
					uid: 26170,
					name: "0005 - Merchandiser 01",
					message: "Different active site exists in the server",
					description: "[dbo].[mob_impBeforeSyncCall]",
					logDate: "2016-09-23T15:47:07.623"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.MobileErrorLog);
	}
}
