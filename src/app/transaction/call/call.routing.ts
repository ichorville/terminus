import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallListComponent } from './call-list/call-list.component';

const callRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/calls',
		pathMatch: 'full'
	},
	{
		path: 'transactions/calls',
		component: CallListComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(callRoutes);