import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration.component';

const administrationRoutes: Routes = [
	{
		path: '',
		redirectTo: '/administration/users',
		pathMatch: 'full'
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(administrationRoutes);
