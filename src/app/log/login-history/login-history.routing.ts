import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginHistoryListComponent } from './login-history-list/login-history-list.component';

const loginHistoryRoutes: Routes = [
	{
		path: '',
		redirectTo: '/log/login-history',
		pathMatch: 'full'
	},
	{
		path: 'log/login-history',
		component: LoginHistoryListComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(loginHistoryRoutes);