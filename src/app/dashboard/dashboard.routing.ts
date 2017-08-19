import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
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
				path: 'dashboards',
				component: DashboardComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);