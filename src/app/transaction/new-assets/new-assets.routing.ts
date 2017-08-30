import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { CallListComponent } from './new-assets-list/call-list.component';
import { CallDetailComponent } from './new-assets-detail/call-detail.component';

const callRoutes: Routes = [
	{
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: SidenavComponent,
        children: [
            {
				path: '',
				redirectTo: 'transactions/new-assets',
				pathMatch: 'full'
			},
			{
				path: 'transactions/new-assets',
				component: CallListComponent
			},
			{
				path: 'transactions/new-assets:id/detail',
				component: CallDetailComponent
			}
        ]
    }
]
export const routing: ModuleWithProviders = RouterModule.forChild(callRoutes);