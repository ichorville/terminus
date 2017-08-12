import { Component, OnInit } from '@angular/core';
import { LoginVariable } from '../global';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
IS_LOGGED_IN=LoginVariable.IS_LOGGED_IN;
	constructor() {

	}

	ngOnInit() {

	}
}
