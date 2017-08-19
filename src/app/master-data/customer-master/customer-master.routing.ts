import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const customerMasterRoutes: Routes = [
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
				path: '',
				redirectTo: '/master-data/customers',
				pathMatch: 'full'
			},
			{
				path: 'master-data/customers',
				component: CustomerListComponent
			},
			{
				path: 'master-data/customers/add',
				component: CustomerAddComponent
			},
			{
				path: 'master-data/customers/:id',
				component: CustomerDetailComponent
			},
			{
				path: 'master-data/customers/:id/edit',
				component: CustomerEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(customerMasterRoutes);