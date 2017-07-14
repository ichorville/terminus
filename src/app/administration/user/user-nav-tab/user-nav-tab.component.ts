import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nav-tab',
  templateUrl: './user-nav-tab.component.html',
  styleUrls: ['./user-nav-tab.component.css']
})
export class UserNavTabComponent implements OnInit {

 tabs: any[];

	constructor() {
		this.tabs = [];
	}

	ngOnInit() {
		this.tabs = [
			{
				name: 'Employees',
				link: '/administration/users/employees',
			},
			{
				name: 'Agents',
				link: '/administration/users/agents',
			}
		];
	}

}
