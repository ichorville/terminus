import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-config-nav-tab',
	templateUrl: './product-config-nav-tab.component.html',
	styleUrls: ['./product-config-nav-tab.component.css']
})
export class ProductConfigNavTabComponent implements OnInit {

	tabs: any[];

	constructor() {
		this.tabs = [];
	}

	ngOnInit() {
		this.tabs = [
			{
				name: 'Groups',
				link: '/configuration/products/groups',
			},
			{
				name: 'Types',
				link: '/configuration/products/types',
			},
			{
				name: 'Categories',
				link: '/configuration/products/categories',
			}
		];
	}

}
