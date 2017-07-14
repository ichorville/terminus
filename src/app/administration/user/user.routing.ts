import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

const userRoutes: Routes = [
	{
		path: '',
		redirectTo: 'administration/users/employees',
		pathMatch: 'full'
	},
	{
		path: 'administration/users',
		redirectTo: '/administration/users/employees',
		pathMatch: 'full'
	},
	{
		path: 'administration/users/employees',
		component: EmployeeListComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(userRoutes);
