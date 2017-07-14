/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { RouterStub } from '../../../../testing/router-stubs';
import { Router } from '@angular/router';

import { SurveyService } from '../survey.service';
import { OutletMasterService} from '../../../master-data/outlet-master/outlet-master.service';
import { CustomerMasterService} from '../../../master-data/customer-master/customer-master.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';
import { SurveyListComponent } from './survey-list.component';

describe('SurveyListComponent', () => {
 	let comp: SurveyListComponent;
	let _ss: any;
  let _oms: any;
  let _cms:any;
  let _mms:any;

	beforeEach(() => {
		_ss = new StubService as any as SurveyService;
    _oms = new StubService as any as OutletMasterService;
    _cms = new StubService as any as CustomerMasterService;
    _mms = new StubService as any as MerchandiserMasterService;
		comp = new SurveyListComponent(_ss,_oms,_cms,_mms);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
		
	it('should fetch the Survey list', () => {
	
		expect(comp.columns[0].name).toBe('ID');
		expect(comp.columns[0].attr).toBe('callId');

		expect(comp.columns[1].name).toBe('Start');
		expect(comp.columns[1].attr).toBe('start');

		expect(comp.columns[2].name).toBe('Outlet');
		expect(comp.columns[2].attr).toBe('outlet');

		expect(comp.columns[3].name).toBe('Merchandiser');
		expect(comp.columns[3].attr).toBe('merchandiser');

 		expect(comp.columns[4].name).toBe('Survey');
		expect(comp.columns[4].attr).toBe('survey');

  	expect(comp.columns[5].name).toBe('Status');
		expect(comp.columns[5].attr).toBe('status');   

		expect(comp.columns.length).toBe(6);
	});
});

class StubService {
	survey: any;
  	details: any;
	
	constructor() {
		this.survey = [
			{
          key: "      1336| 4",
          uid: 4,
          callId: "C0006/1477563065329",
          outlet: "FP East Point",
          agent: "Michael Tan",
          scheduledStart: "2016-10-27T15:41:05",
          survey: "Display in Good condition?",
          status: "30"
			},
			{
          key: "      1336|         5",
          uid: 5,
          callId: "C0006/1477563065329",
          outlet: "FP East Point",
          agent: "Michael Tan",
          scheduledStart: "2016-10-27T15:41:05",
          survey: "Display in Good condition?",
          status: "60"
			}
		];

    this.details = [
			{
          uid: 29,
          description: "Are seasonal goods displayed?",
          answerType: "Selection",
          isMandatoryInCall: false,
          isConfirm: true,
          isActive: false
			},
			{
          uid: 28,
          description: "Are the leg displays clean and free from dust?",
          answerType: "Selection",
          isMandatoryInCall: false,
          isConfirm: true,
          isActive: false
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.survey);
	}

  surveyDetails(): Promise<any> {
		return Promise.resolve(this.survey);
	}
}
