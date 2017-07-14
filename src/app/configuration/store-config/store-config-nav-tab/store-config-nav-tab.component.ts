import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-config-nav-tab',
  templateUrl: './store-config-nav-tab.component.html',
  styleUrls: ['./store-config-nav-tab.component.css']
})
export class StoreConfigNavTabComponent implements OnInit {

			tabs : any;
			constructor() {
				this.tabs=[];
			}

			ngOnInit() {
						this.tabs = [
							{
									name: 'Activities',
									link: '/configuration/store/activities',
							},
							{
									name: 'Locations',
									link: '/configuration/store/locations',
							}
						]; 
			}
}
