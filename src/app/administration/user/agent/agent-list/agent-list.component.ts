import { Component, OnInit } from '@angular/core';
// import { FirebaseListObservable } from 'angularfire2';
import { DeleteEvent } from '../../../../shared/custom-events/delete-event';

import { AgentService } from '../agent.service';
import { EmployeeService } from '../../employee/employee.service';

@Component({
	selector: 'app-agent-list',
	templateUrl: './agent-list.component.html',
	styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
	addButton: boolean;
	taskEdit: boolean;
	taskDelete: boolean;

	users: any[];
	rows: any[];
	url: string;
	columns: any[];
	title: string;

	employeeMap: any;

	constructor(
		private _as: AgentService,
		private _es: EmployeeService
	) { 
		this.rows = [];
		this.employeeMap = {};
		this.addButton = true;
		this.taskEdit = true;
		this.taskDelete = true;
	}

	ngOnInit() {
		this._es.all().then((employees) => {
			employees['t'].forEach((element) => {
				this.employeeMap[element.Uid] = element.Employee;
			});
			this._as.all().then((users) => {
				this.users = users['t'];
				this.updateRows();
			});
		});
		
		this.title = 'Agents';
		this.url = '/administration/users/agents/';
		this.columns = [
			{ name: 'Agent Id', attr: 'agentId', type: 'string' },
			{ name: 'Description', attr: 'description', type: 'string' },
			{ name: 'Employee', attr: 'employee', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent): void {
		alert('Delete Not implemented By Server');
    	// this._us.remove(deleteEvent.id).then(() => {
		// 	this.updateRows();
        // });
	}

	private updateRows() {
		this.rows = [];
		this.users.forEach(element => {
			this.rows.push({
				id: element.Uid,
				agentId: element.Id,
				description: element.MiscData,
				employee: this.employeeMap[element.EmployeeUid]
			});
		});
	}
}