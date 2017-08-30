import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { CallListComponent } from './new-assets-list/call-list.component';
import { CallDetailComponent } from './new-assets-detail/call-detail.component';
import { AssetRequestFormComponent } from './new-assets-request-form/asset-request-form.component';

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
				path: 'transactions/new-assets/:id/detail',
				component: CallDetailComponent
			},
			{
				path: 'transactions/new-assets/:id/form',
				component: AssetRequestFormComponent
			}
        ]
    }
]
export const routing: ModuleWithProviders = RouterModule.forChild(callRoutes);