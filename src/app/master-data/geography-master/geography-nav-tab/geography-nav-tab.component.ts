import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-geography-nav-tab',
	templateUrl: './geography-nav-tab.component.html',
	styleUrls: ['./geography-nav-tab.component.css']
})
export class GeographyNavTabComponent implements OnInit {

	tabs: any[];

	constructor() {
		this.tabs = [];
	}

	ngOnInit() {
		this.tabs = [
			{
				name: 'Countries',
				link: '/master-data/geographies/countries',
			},
			{
				name: 'Regions',
				link: '/master-data/geographies/regions',
			},
			{
				name: 'Districts',
				link: '/master-data/geographies/districts',
			},
			{
				name: 'Towns',
				link: '/master-data/geographies/towns',
			}
		];
	}
}
