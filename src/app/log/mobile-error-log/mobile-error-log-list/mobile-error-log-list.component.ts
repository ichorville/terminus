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

import { MobileErrorLogService } from '../mobile-error-log.service';

@Component({
	selector: 'app-mobile-error-log-list',
	templateUrl: './mobile-error-log-list.component.html',
	styleUrls: ['./mobile-error-log-list.component.css']
})
export class MobileErrorLogListComponent implements OnInit {

	title: string;
	mobileErrorLog: any[];
	columns: any[];
	rows: any[];
	currentDate: any;
	previousDate: any;
	dateOffset:any = (24*60*60*1000) * 7;

	constructor(
		private router: Router,
		private _mels: MobileErrorLogService) {
			this.rows = [];
	 }

	ngOnInit() {

		this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);
		
		let date: any = {
			'from': this.previousDate,
			'to': this.currentDate
		};
		this._mels.all(date).then((mobileErrorLog) => {     
			this.mobileErrorLog = mobileErrorLog;
			this.updateRows();
		});

		this.title = 'Mobile Error';
		this.columns = [
			{ name: 'Name', attr: 'name', type: 'string' },
			{ name: 'Message', attr: 'message', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'LogDate', attr: 'logDate', type: 'string' }
		];	
}

	submit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		let date: any = {
			'from': formSubmitEvent.target[0].value,
			'to': formSubmitEvent.target[1].value
		};
		this._mels.all(date).then((mobileErrorLog) => {     
			this.mobileErrorLog = mobileErrorLog;
			this.updateRows();
		});  
	}

	private updateRows() {
		this.rows = [];
		this.mobileErrorLog.forEach(element => {
			this.rows.push({
				uid: element.UID,
				name:element.Name,
				message: element.Message,
				description: element.Description,
				logDate: element.LogDate
			});
		});
	}
}