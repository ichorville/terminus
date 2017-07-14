import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { matchingPasswords } from '../../../../shared/custom-validators/equal-validator';

import { EmployeeService } from '../../employee/employee.service';

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit{

	form: FormGroup;
	employee: Employee;

	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;
	designationTypeOptions: { key: string, value: string }[];
	employeeOptions: { key: string, value: string, designation: number }[];

	tempOptions: { key: string, value: string, designation: number }[];

	public selected: number;

    constructor(
		private router: Router,
		private _es: EmployeeService,
		private fb: FormBuilder
	) { 
		this.title = 'Add Employee';
		this.buttonValue = 'Save';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();
		this.designationTypeOptions = [];

		this.tempOptions = [];
		this.employee = new Employee();
		this.employee.designationType = 1;
	}

    ngOnInit() {
		this._es.getAllDesignations().then((designations) => {
			this.designationTypeOptions = [];
			designations['t'].forEach((element) => {
				this.designationTypeOptions.push({ key: element.Designationtype, value: element.Description });
			});
		});
		this._es.all().then((employees) => {
			this.employeeOptions = [];
			employees['t'].forEach((element) => {
				this.employeeOptions.push({ key: element.Uid, value: element.Employee, designation: element.Mpt_DesignationEnum });
			});
			this.tempOptions = this.employeeOptions;
			this.filter(this.employee.designationType);
		});
		this.buildForm();
    }

	buildForm(): void {
		this.form = this.fb.group({
			'id': [this.employee.id, [Validators.required]],
			'firstName': [this.employee.firstName, [Validators.required]],
			'lastName': [this.employee.lastName, [Validators.required]],
			'email': [this.employee.email],
			'designationType': [this.employee.designationType, [Validators.required]],
			'streetAddress': [this.employee.streetAddress],
			'notes': [this.employee.notes],
			'telephone': [this.employee.telephone],
			'parentEmployeeUid': [this.employee.parentEmployeeUid, [Validators.required]],
			'username': [this.employee.username, [Validators.required]],
			'password': [this.employee.password, [Validators.required]],
			'confirmPassword': [this.employee.confirmPassword, [Validators.required]]
		},
		{
			validator: matchingPasswords('password', 'confirmPassword')
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
		'id': '',
		'firstName': '',
		'lastName': '',
		'username': '',
		'password': '',
		'confirmPassword': ''
	};

	validationMessages = {
		'id': {
			'required': 'Employee Id is required.',
		},
		'firstName': {
			'required': 'First Name is required.'
		},
		'lastName': {
			'required': 'Last Name is required.'
		},
		'username': {
			'required': 'Username is required.'
		},
		'password': {
			'required': 'Password is required.'
		},
		'confirmPassword': {
			'required': 'Confirmation Password is required.'
		}
	};

	onSubmit(): void {
		if(this.form.valid) {
			let employee: any = {
				'id': this.employee.id,
				'firstName': this.employee.firstName,	
				'lastName': this.employee.lastName,
				'email': this.employee.email,
				'designationType': +this.employee.designationType,
				'streetAddress': this.employee.streetAddress,
				'notes': this.employee.notes,
				'telephone': +this.employee.telephone,
				'parentEmployeeUid': +this.employee.parentEmployeeUid,
				'username': this.employee.username,
				'password': this.employee.designationType == 1 ? null : this.employee.confirmPassword,
				'isDisabled': this.employee.designationType == 1 ? true : false
			};
	
			this._es.create(employee).then((response) => {
				if(response.status == 200) {
					this.router.navigateByUrl('/administration/users/employees'); 
				} else {
					alert('Cannot Add Due to Error');
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

	filter(designationId) {	
		var x = +designationId + 1;
		var arr = this.employeeOptions;
		if(designationId == 1) {
			this.form.get('password').disable();
			this.form.get('confirmPassword').disable();
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 2) {
						return true;
					}
				}
			});
		} else if(designationId == 3) {
			this.form.get('password').enable();
			this.form.get('confirmPassword').enable();
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 2) {
						return true;
					}
				}
			});
		} else if(designationId == 5 || designationId == 8) {
			this.form.get('password').enable();
			this.form.get('confirmPassword').enable();
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 255) {
						return true;
					}
				}
			});
		} else if(designationId == 6 || designationId == 7) {
			this.form.get('password').enable();
			this.form.get('confirmPassword').enable();
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == x) {
						return true;
					}
				}
			});
		} else if(designationId == 2) {
			this.form.get('password').enable();
			this.form.get('confirmPassword').enable();
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 5) {
						return true;
					}
				}
			});
		} else if(designationId == 255) {
			this.form.get('password').enable();
			this.form.get('confirmPassword').enable();
			this.tempOptions = null;
			this.employee['parentEmployeeUid'] = null;
		}
		return this.tempOptions;
	}
}

export class Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	designationType: number;
	streetAddress: string;
	notes: string;
	telephone: number;
	parentEmployeeUid: number;
	username: string;
	password: string;
	confirmPassword: string;
	isDisabled: true;
}
