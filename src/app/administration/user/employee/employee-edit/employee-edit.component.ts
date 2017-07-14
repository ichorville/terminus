import {
	Component, OnInit, Output, EventEmitter, state,
	trigger, style, transition, animate
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { FormElement } from '../../../../shared/form-elements/form-element';
import { FormTextbox } from '../../../../shared/form-elements/form-textbox';
import { FormDropdown } from '../../../../shared/form-elements/form-dropdown';

import { FormSubmitEvent } from '../../../../shared/custom-events/form-submit-event';
import { FormSubmitCompleteEvent } from '../../../../shared/custom-events/form-submit-complete-event';

import { matchingPasswords } from '../../../../shared/custom-validators/equal-validator';

import { EmployeeService } from '../employee.service';

@Component({
	selector: 'app-employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

	form: FormGroup;

	employee: any;
	title: string;
	buttonValue: string;
	formElements: FormElement<any>[];
	message: string;

	onFormSubmitComplete: Subject<FormSubmitCompleteEvent>;
	designationTypeOptions: { key: string, value: string }[];
	employeeOptions: { key: string, value: string, designation: number }[];

	tempOptions: { key: string, value: string, designation: number }[];

	public employeeDesignationEnum: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _es: EmployeeService,
		private fb: FormBuilder
	) {
		this.title = 'Edit Employee';
		this.buttonValue = 'Update';
		this.onFormSubmitComplete = new Subject<FormSubmitCompleteEvent>();	
		this.designationTypeOptions = [];
		this.employee = {};
		// this.createForm();	
		this.tempOptions = [];
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this._es.get(id).then((employee) => {
				this.employee = employee['t'][0];
				this.employeeDesignationEnum = employee['t'][0].Mpt_DesignationEnum;
				console.log('Designation Type is ' + this.employeeDesignationEnum);
				// this.createForm();

				this._es.getAllDesignations().then((designations) => {
					this.designationTypeOptions = [];
					designations['t'].forEach((element) => {
						this.designationTypeOptions.push({ key: element.Designationtype, value: element.Description });
					});
					// this.createForm();
				});
				this._es.all().then((employees) => {
					this.employeeOptions = [];
					employees['t'].forEach((element) => {
						this.employeeOptions.push({ key: element.Uid, value: element.Employee, designation: element.Mpt_DesignationEnum });
					});
					this.tempOptions = this.employeeOptions;
					this.filter(this.employeeDesignationEnum);
					// this.createForm();
				});
			});	
		});
		this.buildForm();
	}

	// submit(formSubmitEvent: FormSubmitEvent) {
	// 	let formValues = formSubmitEvent.formObject;
	// 	let employee: any = {
	// 		'uid': this.employee['Uid'],
	// 		'id': formValues.id == '' ? this.employee['ID'] : formValues.id,
	// 		'firstName': formValues.firstName == '' ? this.employee['FirstName'] : formValues.firstName,	
	// 		'lastName': formValues.lastName == '' ? this.employee['LastName'] : formValues.lastName,
	// 		'streetAddress': formValues.streetAddress == '' ? this.employee['StreetAddress'] : formValues.streetAddress,
	// 		'telephone': formValues.telephone == '' ? this.employee['Telephone1'] : +formValues.telephone,
	// 		'email': formValues.email == '' ? this.employee['Email'] : formValues.email,
	// 		'notes': formValues.notes == '' ? this.employee['Notes'] : formValues.notes,
	// 		'userName': formValues.username == '' ? this.employee['Username'] : formValues.username,
	// 		'designationType': formValues.designationType == '' ? this.employee['Mpt_DesignationEnum'] : +formValues.designationType,
	// 		'manager': formValues.parentEmployeeUid == '' ? this.employee['Manager'] : +formValues.parentEmployeeUid,
	// 		'isDisabled': true
	// 	};
		
	// 	this._es.update(employee).then((status) => {
	// 		if(status == 200) {
	// 			this.router.navigateByUrl('/administration/users/employees');
	// 		} else {
	// 			alert('Cannot Update Due to Error');
	// 		}
	// 	});	
	// }

	// private createForm() {
	// 	console.log(this.employee['Mpt_DesignationEnum']);
	// 	this.formElements = [
	// 		new FormTextbox({
	// 			key: 'id',
	// 			label: 'Id',
	// 			value: this.employee['ID'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 1,
	// 			placeholder: 'User Id'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'firstName',
	// 			label: 'First tName',
	// 			value: this.employee['FirstName'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 2,
	// 			placeholder: 'First Name'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'lastName',
	// 			label: 'Last Name',
	// 			value: this.employee['LastName'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 3,
	// 			placeholder: 'Last Name'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'streetAddress',
	// 			label: 'Street Address',
	// 			value: this.employee['StreetAddress'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 4,
	// 			placeholder: 'Street Address'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'email',
	// 			label: 'Email',
	// 			value: this.employee['Email'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 5,
	// 			placeholder: 'Email'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'telephone',
	// 			label: 'Telephone',
	// 			value: this.employee['Telephone1'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 6,
	// 			placeholder: 'Telephone'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'notes',
	// 			label: 'Notes',
	// 			value: this.employee['Notes'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 7,
	// 			placeholder: 'Notes'
	// 		}),
	// 		new FormTextbox({
	// 			key: 'username',
	// 			label: 'User Name',
	// 			value: this.employee['Username'],
	// 			controlType: 'textbox',
	// 			required: true,
	// 			order: 8,
	// 			placeholder: 'User Name'
	// 		}),
	// 		new FormDropdown({
	// 			key: 'designationType',
	// 			label: 'Designation Type',
	// 			value: this.employee['Mpt_DesignationEnum'],
	// 			controlType: 'dropbox',
	// 			options: this.designationTypeOptions,
	// 			required: true,
	// 			order: 9
	// 		}),
	// 		new FormDropdown({
	// 			key: 'parentEmployeeUid',
	// 			label: 'Report To',
	// 			value: this.employee['Manager'],
	// 			controlType: 'dropbox',
	// 			options: this.employeeOptions,
	// 			required: true,
	// 			order: 10
	// 		})
	// 	];
	// }

	buildForm(): void {
		this.form = this.fb.group({
			'id': [this.employee.id, [Validators.required]],
			'firstName': [this.employee.firstName, [Validators.required]],
			'lastName': [this.employee.lastName, [Validators.required]],
			'email': [this.employee.email],
			'designationType': [this.employee.designationType],
			'streetAddress': [this.employee.streetAddress],
			'notes': [this.employee.notes],
			'telephone': [this.employee.telephone],
			'parentEmployeeUid': [this.employee.parentEmployeeUid, [Validators.required]],
			'username': [this.employee.username],
			'password': [this.employee.password],
			'confirmPassword': [this.employee.confirmPassword]
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
		'parentEmployeeUid': ''
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
		'parentEmployeeUid': {
			'required': 'Manager is required.'
		}
	};

	onSubmit(): void {
		if(this.form.valid) {
			let employee: any = {
				'uid': this.employee.Uid,
				'id': this.employee.ID,
				'firstName': this.employee.FirstName,	
				'lastName': this.employee.LastName,
				'email': this.employee.Email,
				'designationType': +this.employee.Mpt_DesignationEnum,
				'streetAddress': this.employee.StreetAddress,
				'notes': this.employee.Notes,
				'telephone': +this.employee.Telephone1,
				'parentEmployeeUid': +this.employee.ManagerUid,
				'password': this.employee.confirmPassword ? this.employee.confirmPassword : null,
				'isDisabled': this.employeeDesignationEnum == '1' ? true : false
			};
			
			this._es.update(employee).then((response) => {
				if(response.status == 200) {
					this.router.navigateByUrl('/administration/users/employees');
				} else {
					alert('Cannot Update Due to Error');
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
		if(designationId == 1 || designationId == 3) {
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 2) {
						return true;
					}
				}
			});
		} else if(designationId == 5 || designationId == 8) {
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 255) {
						return true;
					}
				}
			});
		} else if(designationId == 6 || designationId == 7) {
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == x) {
						return true;
					}
				}
			});
		} else if(designationId == 2) {
			this.tempOptions = arr.filter(function (element) {
				for(var i in arr) {
					if(element.designation == 5) {
						return true;
					}
				}
			});
		} else if(designationId == 255) {
			this.tempOptions = null;
			this.employee['parentEmployeeUid'] = null;
		}
		return this.tempOptions;
	}
}