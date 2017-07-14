import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable } from 'angularfire2';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { EmployeeService } from '../employee.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  	employees: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;
	designationMap: any;
 
	constructor( 
		private _es: EmployeeService
	) { 
		this.rows = [];
		this.designationMap = {};
	}

	ngOnInit() {
		this._es.all().then((employees) => {
			this.employees = employees['t'];
			this.updateRows();
		});
	
		this.title = 'Employees';
		this.url = '/administration/users/employees/';
		this.columns = [
			{ name: 'Id', attr: 'employeeId', type: 'string' },
			{ name: 'First Name', attr: 'firstName', type: 'string' },
			{ name: 'Last Name', attr: 'lastName', type: 'string' },
			{ name: 'Employee', attr: 'employee', type: 'string' },
			{ name: 'Email', attr: 'email', type: 'string' },
			{ name: 'User Name', attr: 'userName', type: 'string' },
			{ name: 'Manager', attr: 'manager', type: 'string' }		];	
	}

	delete(deleteEvent: DeleteEvent): void {
		alert('Delete Not implemented By Server');
		// this._es.remove(deleteEvent.id).then((status) => {
		// 	if(status == 200) {
		// 		this._es.all().then((employees) => {
		// 			this.employees = employees;
		// 			this.updateRows();
		// 		});
		// 	} else {
		// 		alert('Could not delete due to error' + status);
		// 	}
		// });
	}

	private updateRows() {
		this.rows = [];
		this.employees.forEach(element => {
			this.rows.push({
				id: element.Uid,
				employeeId:  element.Id,
				firstName: element.FirstName,
				lastName: element.LastName,
				employee: element.Employee,
				email: element.Email,
				userName: element.UserName,
				manager: element.Manager
			});
		});
	}
}