import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LoginVariable } from './global';

@Component({
	selector: 'app-root',
	//templateUrl: './app.component.html',
	template: `
   
	<app-header></app-header>
	<router-outlet></router-outlet>
	
  `,
	styleUrls: ['./app.component.css']
	
})
export class AppComponent {
	
	constructor(private location: Location) { }

	back(): void {
		this.location.back();
	}

}

