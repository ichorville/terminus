import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { CallService } from '../call.service';

@Component({
	selector: 'app-call-list',
	templateUrl: './call-list.component.html',
	styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {
	taskDetail: boolean;
	title: string;
	calls: any[];
	columns: any[];
	rows: any[];
	buttonValue: string;
	currentDate: any;
	previousDate: any;
	dateOffset: any = (24 * 60 * 60 * 1000) * 7;
	url: string;
	status: any;

	constructor(private _cs: CallService) {
		this.taskDetail = true;
		this.rows = [];
		this.status = 0;
	}

	ngOnInit() {

		this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);

		let date: any = {
			'from': this.previousDate,
			'to': this.currentDate,
			'status': this.status
		};
		this._cs.all(date).then((calls) => {
			this.calls = calls['t'];
			this.updateRows();
		});

		this.title = 'Calls';
		this.url = '/transactions/calls/';
		this.columns = [
			{ name: 'ID', attr: 'id', type: 'string' },
			{ name: 'Start', attr: 'scheduledStart', type: 'string' },
			{ name: 'End', attr: 'scheduledEnd', type: 'string' },
			{ name: 'Outlet', attr: 'outlet', type: 'string' },
			{ name: 'Agent Name', attr: 'agent', type: 'string' },
			{ name: 'Status', attr: 'status', type: 'string' },
			{ name: 'Creation Date', attr: 'creationDate', type: 'string' }
		];
	}

	submit(formSubmitEvent) {
		formSubmitEvent.preventDefault();


		let date: any = {
			'from': formSubmitEvent.target[0].value,
			'to': formSubmitEvent.target[1].value,
			'status': formSubmitEvent.target[2].value
		};
		this._cs.all(date).then((calls) => {
			this.calls = calls['t'];
			this.updateRows();
		});
	}

	private updateRows() {
		this.rows = [];
		this.calls.forEach(element => {
			this.rows.push({
				uid: element.UID,
				id: element.ID,
				scheduledStart: element.ScheduledStart,
				scheduledEnd: element.ScheduledEnd,
				outlet: element.Outlet,
				agent: element.Agent,
				status: element.Status,
				creationDate: element.CreationDate
			});
		});
	}

	delete(any) {

	}
}