import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate } from '@angular/core';
import { MdDatepickerModule, MdNativeDateModule, DateAdapter,
	NativeDateAdapter, MD_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DeleteEvent } from '../../../shared/custom-events/delete-event';

import { NewAssetService } from '../new-asset.service';

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
	selector: 'app-new-asset-list',
	templateUrl: './new-asset-list.component.html',
	styleUrls: ['./new-asset-list.component.css'],
	providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class NewAssetListComponent implements OnInit {
    
    asset: NewAssetCriteria;
    assets: any[];
    form: FormGroup;
    previousDate: any;
    currentDate: any;
    dateOffset: any = (24 * 60 * 60 * 1000) * 7;
    taskDetail: boolean;
    taskForm: boolean;
    title: string;
    url: string;
    columns: any[];
    rows: any[];
    status: any;

    assetStatus = [
		{ key: 0, value: 'All' },
		{ key: 5, value: 'In Progress' },
		{ key: 6, value: 'Completed' }
	];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _nas: NewAssetService
    ) {
        this.status = 0;
        this.assets = [];
        this.taskDetail = true;
        this.taskForm = true;
        this.asset = new NewAssetCriteria();
    }

    ngOnInit() {
        if (LoginVariable.IS_LOGGED_IN == false) {
			return this.router.navigateByUrl(`/login`);
        }
        
        this.currentDate = new Date();
		this.currentDate = this.currentDate.getFullYear() + '-' + ('0' + (this.currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.currentDate.getDate()).slice(-2);

		this.previousDate = new Date();
		this.previousDate.setTime(this.previousDate.getTime() - this.dateOffset);
		this.previousDate = this.previousDate.getFullYear() + '-' + ('0' + (this.previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + this.previousDate.getDate()).slice(-2);

		this.asset.callStart = this.previousDate;
		this.asset.callEnd = this.currentDate;
		this.asset.assetStatus = this.status;

        console.log(this.currentDate);
        this.buildForm();

        let date: any = {
			'from': this.previousDate,
			'to': this.currentDate,
			'status': this.status
		};

        this._nas.all(date).then((assets) => {
            console.log(assets);
            this.assets = assets['t'];
            this.updateRows();
        });

        this.title = 'New Facility Requests';
        this.url = '/transactions/new-assets/';

        this.columns = [
			{ name: 'ID', attr: 'id', type: 'string' },
			{ name: 'Requested Date', attr: 'scheduledStart', type: 'string' },
			{ name: 'Outlet', attr: 'outlet', type: 'string' },
			{ name: 'Agent Name', attr: 'agent', type: 'string' }
		];
    }

    buildForm(): void {
		this.form = this.fb.group({
			'from': [this.asset.callStart, [Validators.required]],
			'to': [this.asset.callEnd, [Validators.required]],
			'status': [this.asset.assetStatus, [Validators.required]]
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
				'from': this.asset.callStart == this.previousDate ? this.previousDate : this.asset.callStart.getFullYear() + '-' + ('0' + (this.asset.callStart.getMonth() + 1)).slice(-2) + '-' + ('0' + this.asset.callStart.getDate()).slice(-2),
				'to': this.asset.callEnd == this.currentDate ? this.currentDate : this.asset.callEnd.getFullYear() + '-' + ('0' + (this.asset.callEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + this.asset.callEnd.getDate()).slice(-2),
				'status': this.asset.assetStatus
			};
			this._nas.all(date).then((assets) => {
				this.assets = assets['t'];
				if (this.assets.length > 0) {
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
		this.assets.forEach(element => {
			this.rows.push({
				uid: element.UID,
				id: element.ID,
				scheduledStart: element.ScheduledStart,
				outlet: element.Outlet,
				agent: element.Agent
			});
		});
	}
}

export class NewAssetCriteria {
    callStart: Date;
	callEnd: Date;
	assetStatus: number;
}