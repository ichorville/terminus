import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const outletConfigRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/outlets/classes',
		pathMatch: 'full'
	},
		{
		path: 'configuration/outlets',
		redirectTo: '/configuration/outlets/classes',
		pathMatch: 'full'
	},
]

export const routing: ModuleWithProviders = RouterModule.forChild(outletConfigRoutes);