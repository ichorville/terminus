import { ModuleWithProviders } 	from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { HomeComponent } from './home.component';

import { AuthGuard } from '../auth/auth.guard';

const homeRoutes: Routes = [
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
				path: 'home',
				component: HomeComponent,
				canActivate: [AuthGuard]
			}
		]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);