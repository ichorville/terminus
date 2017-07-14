import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const storeConfigRoutes: Routes = [
    	{
			path: '',
			redirectTo: '/configuration/store/activities',
			pathMatch: 'full'
		},
		{
			path: 'configuration/store',
			redirectTo: '/configuration/store/activities',
			pathMatch: 'full'
		}
]

export const routing: ModuleWithProviders = RouterModule.forChild(storeConfigRoutes);