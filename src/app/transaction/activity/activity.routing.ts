import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { ActivityListComponent } from './activity-list/activity-list.component';

const loginHistoryRoutes: Routes = [
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
				path: 'transactions/activities',
				component: ActivityListComponent
			}
        ]
    }
]
export const routing: ModuleWithProviders = RouterModule.forChild(loginHistoryRoutes);