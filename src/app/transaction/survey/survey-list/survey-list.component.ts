import {Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate} from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { SurveyService } from '../survey.service';
import { OutletMasterService} from '../../../master-data/outlet-master/outlet-master.service';
import { CustomerMasterService} from '../../../master-data/customer-master/customer-master.service';
import { MerchandiserMasterService } from '../../../master-data/merchandiser-master/merchandiser-master.service';

@Component({
	selector: 'app-survey-list',
	templateUrl: './survey-list.component.html',
	styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
	title: string;
	surveys: any[];
	columns: any[];
	rows: any[];
	buttonValue: string;
	currentDate: any;
	previousDate: any;
	dateOffset:any = (24*60*60*1000) * 7;
	outletOptions: any;
	customerOptions: any;
	merchandiserOptions: any;
	surveyOptions: any;

	constructor(
		private _ss: SurveyService,
		private _oms: OutletMasterService,
		private _cms: CustomerMasterService,
		private _mms: MerchandiserMasterService) {
			this.rows = [];
	 }

 ngOnInit() {

		this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);
		
		let survey: any = {
			'from': this.previousDate,
			'to': this.currentDate,
			'merchandiser': '-1',
			'outlet': '-1',
			'customer': '-1',
			'survey': '-1'
		};
		this._ss.all(survey).then((surveys) => {     
			this.surveys = surveys;
			this.updateRows();
		});

		this._oms.all().then((outlets) => {
			this.outletOptions = [];
			outlets['t'].forEach((element) => {
				this.outletOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		this._mms.all().then((merchandisers) => {
				this.merchandiserOptions = [];
				merchandisers['t'].forEach((element) => {
				this.merchandiserOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		this._cms.all().then((customers) => {
			this.customerOptions = [];
			customers.forEach((element) => {
				this.customerOptions.push({ key: element.Uid, value: element.Name });
			});
		});

		
		this._ss.surveyDetails().then((customers) => {
			this.surveyOptions = [];
			customers.forEach((element) => {
				this.surveyOptions.push({ key: element.Uid, value: element.Description });
			});
		});

		this.title = 'Surveys';
		this.columns = [
			{ name: 'ID', attr: 'callId', type: 'string' },
			{ name: 'Start', attr: 'start', type: 'string' },
			{ name: 'Outlet', attr: 'outlet', type: 'string' },
			{ name: 'Merchandiser', attr: 'merchandiser', type: 'string' },
			{ name: 'Survey', attr: 'survey', type: 'string' },
			{ name: 'Status', attr: 'status', type: 'string' }
		];	
}

	submit(formSubmitEvent) {
		formSubmitEvent.preventDefault();

		let survey: any = {
			'from': formSubmitEvent.target[0].value,
			'to': formSubmitEvent.target[1].value,
			'merchandiser': formSubmitEvent.target[2].value,
			'outlet': formSubmitEvent.target[3].value,
			'customer': formSubmitEvent.target[4].value,
			'survey': formSubmitEvent.target[5].value
		};
		this._ss.all(survey).then((surveys) => {    
			this.surveys = surveys;
			this.updateRows();
		});  
	}

	private updateRows() {
		this.rows = [];
		this.surveys.forEach(element => {
			this.rows.push({
				uid: element.UID,
				callId:element.CallID,
				start: element.ScheduledStart,
				outlet: element.Outlet,
				merchandiser: element.Agent,
				status: element.Status,
				survey: element.Survey
			});
		});
	}
}
