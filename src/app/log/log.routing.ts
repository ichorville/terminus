import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginHistoryListComponent } from './login-history/login-history-list/login-history-list.component';
import { LoginHistoryComponent } from './login-history/login-history.component';

const masterDataRoutes: Routes = [
	{
		path: '',
		redirectTo: '/log/loging-history',
		pathMatch: 'full'
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(masterDataRoutes);