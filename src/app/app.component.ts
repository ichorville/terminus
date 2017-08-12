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
	title = 'app works!';
	//IS_LOGGED_IN=LoginVariable.IS_LOGGED_IN;
	
	constructor(private location: Location) { }

	back(): void {
		this.location.back();
	}

}

