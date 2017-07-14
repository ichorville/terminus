import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-outlet-config-nav-tab',
	templateUrl: './outlet-config-nav-tab.component.html',
	styleUrls: ['./outlet-config-nav-tab.component.css']
})
export class OutletConfigNavTabComponent implements OnInit {

	tabs: any[];

	constructor() {
		this.tabs = [];
	}

	ngOnInit() {
		this.tabs = [
			{
				name: 'Classes',
				link: '/configuration/outlets/classes',
			},
			{
				name: 'Types',
				link: '/configuration/outlets/types',
			}
		];
	}

}
