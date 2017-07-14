import { ComponentFixture, TestBed, 
	async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Headers, Http, RequestOptions } from '@angular/http';

import { LoginHistoryListComponent } from './login-history-list.component';
import { LoginHistoryService } from '../login-history.service';

describe('Component: LoginHistoryListComponent', () => {

	let comp: LoginHistoryListComponent;
	let _lhs: any;

	beforeEach(() => {
		_lhs = new StubService as any as LoginHistoryService;
		comp = new LoginHistoryListComponent(_lhs);
		
		comp.ngOnInit();
	});

	it('should create an instance', () => {
			expect(comp).toBeTruthy();
	});
    
	it('should fetch the login history list', () => {
	
		expect(comp.columns[0].name).toBe('Login Id');
		expect(comp.columns[0].attr).toBe('loginId');

		expect(comp.columns[1].name).toBe('User');
		expect(comp.columns[1].attr).toBe('user');

		expect(comp.columns[2].name).toBe('IPAddress');
		expect(comp.columns[2].attr).toBe('iPAddress');

		expect(comp.columns[3].name).toBe('Type');
		expect(comp.columns[3].attr).toBe('type');

		expect(comp.columns.length).toBe(4);
	});
});

class StubService {
	loginHistory: any;
	
	constructor() {
		this.loginHistory = [
			{
        key: 2655,
        loginId: "admin",
        user: "00003-System Administrator",
        iPAddress: "10.20.10.144",
        type: "Log In"
			},
			{
        key: 2656,
        loginId: "admin",
        user: "00003-System Administrator",
        iPAddress: "10.20.10.146",
        type: "Log Out"
			}
		];
	}
	
	all(): Promise<any> {
		return Promise.resolve(this.loginHistory);
	}
}
