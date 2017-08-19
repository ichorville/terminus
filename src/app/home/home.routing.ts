import { ModuleWithProviders } 	from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { HomeComponent } from './home.component';

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
				component: HomeComponent
			}
		]
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);