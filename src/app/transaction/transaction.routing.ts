import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const transactionRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/activities',
		pathMatch: 'full'
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(transactionRoutes);