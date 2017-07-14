import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { AgentService } from '../agent.service';
import { EmployeeService } from '../../employee/employee.service';

@Component({
	selector: 'app-agent-edit',
	templateUrl: './agent-edit.component.html',
	styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit {

 	agent: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;
	employeeMap: { key: string, value: string }[];
	designationMap: { key: string, value: string }[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _as: AgentService,
		private _es: EmployeeService
	) { 
		this.title = 'Edit Agent';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();	
		this.agent = {};
		this.createForm();	
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._as.get(id).then((agent) => {
				this.agent = agent['t'][0];
				console.log(this.agent);
				this.createForm();
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
			});
		});
	}

	submit(formSubmitEvent: FormSubmitEvent) {
		let formValues = formSubmitEvent.formObject;
		let agent: any = {
			'uid': this.agent['Uid'],
			'description': formValues.description == '' ? this.agent['MiscData'] : formValues.description,
			'designationUid': formValues.designationUid == '' ? this.agent['Mpt_DesignationEnum'] : formValues.designationUid,
			'employeeUID': formValues.employeeUid == '' ? this.agent['EmployeeUid'] : formValues.employeeUid
		};

		this._as.update(agent).then((status) => {
			if(status == 200) {
				this.router.navigateByUrl('/administration/users/agents');
			} else {
				alert('Cannot Update Due to Error');
			}
		});	
	}

	private createForm() {
		this.formElements = [
			new FormTextbox({
				key: 'description',
				label: 'Agent Description',
				value: this.agent['MiscData'],
				controlType: 'textbox',
				required: true,
				order: 1,
				placeholder: 'Agent Description'
			}),
			new FormDropdown({
				key: 'designationUid',
				label: 'Designation Type',
				value: this.agent['Mpt_DesignationEnum'],
				controlType: 'dropbox',
				options: this.designationMap,
				required: true,
				order: 2
			}),
			new FormDropdown({
				key: 'employeeUid',
				label: 'Employee',
				value: this.agent['EmployeeUid'],
				controlType: 'dropbox',
				options: this.employeeMap,
				required: true,
				order: 3
			})
		];
	}
}
