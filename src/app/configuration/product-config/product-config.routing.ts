import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const productConfigRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/products/groups',
		pathMatch: 'full'
	},
	{
		path: 'configuration/products',
		redirectTo: '/configuration/products/groups',
		pathMatch: 'full'
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(productConfigRoutes);