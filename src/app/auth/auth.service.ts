import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './user';
import { AuthComponent } from './auth.component';

import { LoginVariable } from '../global';

@Injectable()
export class AuthService {
	private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get isLoggedIn() {
		return this.loggedIn.asObservable();
	}

	constructor(
		private router: Router
	) { }

	login(user: User) {
		if (user.userName !== '' && user.password != '') {
			this.loggedIn.next(true);
			LoginVariable.IS_LOGGED_IN = true;
			this.router.navigate(['/home']);
		}
	}

	logout() {
		this.loggedIn.next(false);
		LoginVariable.IS_LOGGED_IN = false;
		this.router.navigate(['/login']);
	}
}
