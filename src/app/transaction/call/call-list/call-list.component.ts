import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate } from '@angular/core';
import { MdDatepickerModule, MdNativeDateModule, DateAdapter,
	NativeDateAdapter, MD_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { CallService } from '../call.service';

import { LoginVariable } from '../../../global';

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

	callStatus = [
		{ key: 0, value: 'All' },
		{ key: 5, value: 'In Progress' },
		{ key: 6, value: 'Completed' }
	];

	form: FormGroup;
	call: Call;
	
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
	status: any;

	constructor(
		private _cs: CallService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.calls = [];
		this.taskDetail = true;
		this.rows = [];
		this.status = 0;
		this.call = new Call();
	}

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}

		this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);

		this.call.callStart = this.previousDate;
		this.call.callEnd = this.currentDate;
		this.call.callStatus = this.status;

		this.buildForm();

		let date: any = {
			'from': this.previousDate,
			'to': this.currentDate,
			'status': this.status
		};
		
		this._cs.all(date).then((calls) => {
			this.calls = calls['t'];
			if (this.calls.length > 0) {
				this.updateRows();
			} 
		});

		this.title = 'Calls';
		this.url = '/transactions/calls/';
		this.columns = [
			{ name: 'ID', attr: 'id', type: 'string' },
			{ name: 'Start', attr: 'scheduledStart', type: 'string' },
			{ name: 'End', attr: 'scheduledEnd', type: 'string' },
			{ name: 'Outlet', attr: 'outlet', type: 'string' },
			{ name: 'Agent Name', attr: 'agent', type: 'string' }
		];
	}

	buildForm(): void {
		this.form = this.fb.group({
			'from': [this.call.callStart, [Validators.required]],
			'to': [this.call.callEnd, [Validators.required]],
			'status': [this.call.callStatus, [Validators.required]]
		});
		this.form.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}
	
	onValueChanged(data?: any) {
		if(!this.form) {
			return;
		}
		const thisForm = this.form;

		for(const field in this.formErrors) {
			// clear previous messages if any
			this.formErrors[field] = '';
			const control = thisForm.get(field);

			if(control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for(const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	formErrors = {
		'from': '',
		'to': '',
		'status': ''
	};

	validationMessages = {
		'from': {
			'required': 'Call Start Date is required.',
		},
		'to': {
			'required': 'Call End Date is required.'
		},
		'status': {
			'required': 'Call status is required.'
		}
	};

	onSubmit(): void {
		if (this.form.valid) {
			let date: any = {
				'from': this.call.callStart == this.previousDate ? this.previousDate : this.call.callStart.getFullYear() + '-' + ('0' + (this.call.callStart.getMonth() + 1)).slice(-2) + '-' + ('0' + this.call.callStart.getDate()).slice(-2),
				'to': this.call.callEnd == this.currentDate ? this.currentDate : this.call.callEnd.getFullYear() + '-' + ('0' + (this.call.callEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + this.call.callEnd.getDate()).slice(-2),
				'status': this.call.callStatus
			};
			this._cs.all(date).then((calls) => {
				this.calls = calls['t'];
				if (this.calls.length > 0) {
					this.updateRows();
				}
			});
		} else {
			const thisForm = this.form;

			for(const field in this.formErrors) {
				// clear previous messages if any
				this.formErrors[field] = '';
				const control = thisForm.get(field);

				if(control && control.dirty && !control.valid) {
					const messages = this.validationMessages[field];
					for(const key in control.errors) {
						this.formErrors[field] += messages[key] + ' ';
					}
				}
			}
		}
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
				agent: element.Agent
			});
		});
	}
}

export class Call {
	callStart: Date;
	callEnd: Date;
	callStatus: number;
}
