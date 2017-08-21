import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';

import { fadeInAnimation } from '../shared/animations/fade-in.animation';

import { LoginVariable } from '../global';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css'],
	animations: [ fadeInAnimation],
	host: { '[@fadeInAnimation]': '' }
})
export class SidenavComponent implements OnInit {

	isLoggedIn$: Observable<boolean>;
	
	constructor(
		private router: Router,
		private authService: AuthService
	) { }

	ngOnInit() {
		if (LoginVariable.IS_LOGGED_IN == false) {
			this.router.navigateByUrl(`/login`);
		}
		this.isLoggedIn$ = this.authService.isLoggedIn;
	}

	onLogout() {
		this.authService.logout();
	}
}
