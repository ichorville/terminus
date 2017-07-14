import { Component, OnInit } from '@angular/core';
import { DeleteEvent } from '../../../shared/custom-events/delete-event';
import { LoginHistoryService } from '../login-history.service';


@Component({
	selector: 'app-login-history-list',
	templateUrl: './login-history-list.component.html',
	styleUrls: ['./login-history-list.component.css']
})
export class LoginHistoryListComponent implements OnInit {

	title: string;
	url: string;
	loginHistory: any[];
	columns: any[];
	rows: any[];

	constructor(private _lhs: LoginHistoryService) {
		this.rows = [];
	}

	ngOnInit() {
		this._lhs.all().then((loginHistory) => {
			this.loginHistory = loginHistory['t'];
			this.updateRows();
		});

		this.title = 'Login History';
		this.url = '/logs/login-history/';
		this.columns = [
			{ name: 'Login Id', attr: 'loginId', type: 'string' },
			{ name: 'User', attr: 'user', type: 'string' },
			{ name: 'IPAddress', attr: 'iPAddress', type: 'string' },
			{ name: 'Type', attr: 'type', type: 'string' }
		];
	}

	delete(deleteEvent: DeleteEvent) {
		alert('Delete is not implemented yet');
	}

	private updateRows() {
		this.rows = [];
		this.loginHistory.forEach(element => {
			this.rows.push({
				uid: element.Key,
				loginId:element.LoginId,
				user: element.User,
				iPAddress: element.IPAddress,
				type: element.Type
			});
		});
	}
}
