import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { AgentService } from '../agent.service';
import { EmployeeService } from '../../employee/employee.service';

@Component({
	selector: 'app-agent-add',
	templateUrl: './agent-add.component.html',
	styleUrls: ['./agent-add.component.css']
})
export class AgentAddComponent implements OnInit {

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;
	employeeMap: { key: string, value: string }[];
	designationMap: { key: string, value: string }[];

	constructor(
		private router: Router,
		private _as: AgentService,
		private _es: EmployeeService
	) { 
		this.title = 'Add Agent';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.createForm();
	}

	ngOnInit() {
		this._es.all().then((employees) => {
			this.employeeMap = [];
			employees['t'].forEach((element) => {
				this.employeeMap.push({ key: element.Uid, value: element.Employee });
			});
			this.createForm();
		});
		this._es.getAllDesignations().then((designations) => {
			this.designationMap = [];
			designations['t'].forEach((element) => {
				this.designationMap.push({ key: element.Designationtype, value: element.Description });
			});
			this.createForm();
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let agent: any = {
			'description': formValues.description,
			'designationUid': formValues.designationUid,
			'employeeUID': formValues.employeeUid
		};
		console.log(agent);
		this._as.create(agent).then((response) => {
			if(response.status == 200) {
				this.router.navigateByUrl('/administration/users/agents');
			} else {
				alert('Cannot Add User Due to Error');
			}
		});		
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'description',
				label: 'Description',
				value: '',
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Description'
			}),
			new FormDropdown({
				key: 'designationUid',
				label: 'Designation Type',
				value: '',
				controlType: 'dropbox',
				options: this.designationMap,
				required: true,
				order: 2
			}),
			new FormDropdown({
				key: 'employeeUid',
				label: 'Employee',
				value: '',
				controlType: 'dropbox',
				options: this.employeeMap,
				required: true,
				order: 3
			})
		];
	}
}
