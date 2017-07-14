import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityListComponent } from './activity-list/activity-list.component';

const loginHistoryRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/activities',
		pathMatch: 'full'
	},
	{
		path: 'transactions/activities',
		component: ActivityListComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(loginHistoryRoutes);