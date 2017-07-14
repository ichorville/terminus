import { ModuleWithProviders } 	from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
    {
		path:'',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);