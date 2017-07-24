import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallListComponent } from './call-list/call-list.component';
import { CallDetailComponent } from './call-detail/call-detail.component';

const callRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/calls',
		pathMatch: 'full'
	},
	{
		path: 'transactions/calls',
		component: CallListComponent
	},
	{
		path: 'transactions/calls/:id/detail',
		component: CallDetailComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(callRoutes);