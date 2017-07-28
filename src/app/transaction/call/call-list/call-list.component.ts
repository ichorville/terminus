import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';

import { MdDatepickerModule, MdNativeDateModule, DateAdapter,
	NativeDateAdapter, MD_DATE_FORMATS } from '@angular/material';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../shared/form-elements/form-dropdown';
import { FormSubmitEvent } from '../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../shared/custom-events/form-submit-complete-event';

import { CallService } from '../call.service';

export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } else {
            return date.toDateString();
        }
    }
}

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

const MY_DATE_FORMATS = {
   parse: {
       dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
   },
	// dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
	dateInput: 'input',
	monthYearLabel: {year: 'numeric', month: 'short'},
	dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
	monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

   export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       if (displayFormat == "input") {
           let day = date.getDate();
           let month = date.getMonth() + 1;
           let year = date.getFullYear();
           return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
       } else {
           return date.toDateString();
       }
   }

   private _to2digit(n: number) {
       return ('00' + n).slice(-2);
   } 
}

@Component({
	selector: 'app-call-list',
	templateUrl: './call-list.component.html',
	styleUrls: ['./call-list.component.css'],
	providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class CallListComponent implements OnInit {

	state = [
		{ key: '0', value: 'All' },
		{ key: '5', value: 'In Progress' },
		{ key: '6', value: 'Completed' }
	];

	selectedValue: string;
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
	status: '0';

	constructor(private _cs: CallService) {
		this.taskDetail = true;
		this.rows = [];
		// this.status = 0;
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
		console.log(formSubmitEvent);

		console.log(document.getElementById('state'));

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

