import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchandiser-config-nav-tab',
  templateUrl: './merchandiser-config-nav-tab.component.html',
  styleUrls: ['./merchandiser-config-nav-tab.component.css']
})
export class MerchandiserConfigNavTabComponent implements OnInit {

	tabs: any[];

	constructor() {
		this.tabs = [];
	}

	ngOnInit() {
		this.tabs = [
			{
				name: 'Outlets',
				link: '/configuration/merchandisers/outlets',
			},
			{
				name: 'Products',
				link: '/configuration/merchandisers/products',
			}
		];
	}

}