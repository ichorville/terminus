import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const employeeRoutes: Routes = [
	{
		path: '',
		redirectTo: 'administration/users/employees',
		pathMatch: 'full'
	},
	{
		path: 'administration/users/employees',
		component: EmployeeListComponent
	},
	{
		path: 'administration/users/employees/add',
		component: EmployeeAddComponent
	},
	{
		path: 'administration/users/employees/:id/edit',
		component: EmployeeEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(employeeRoutes);