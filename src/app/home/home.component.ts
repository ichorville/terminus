import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../shared/animations/fade-in.animation';

import { LoginVariable } from '../global';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

	@Output()
	startDate: string;
	@Output()
	endDate: string;

	constructor(
		private router: Router
	) 
	
	{this.startDate = '';
		this.endDate = ''; 
	
}	

	ngOnInit() {

		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();

		var firstDay = new Date(y, m, 1).toString();
		var lastDay = new Date(y, m + 1, 0).toString();
		
		let startDateArr = firstDay.split(' ');
		let endDateArr = lastDay.split(' ');

		this.startDate = `${startDateArr[3]}-${m + 1}-${startDateArr[2]}`;
		this.endDate = `${endDateArr[3]}-${m + 1}-${endDateArr[2]}`;
	}
}

