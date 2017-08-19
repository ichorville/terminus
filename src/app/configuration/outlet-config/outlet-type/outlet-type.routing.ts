import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';

import { OutletTypeAddComponent } from './outlet-type-add/outlet-type-add.component';
import { OutletTypeEditComponent } from './outlet-type-edit/outlet-type-edit.component';
import { OutletTypeListComponent } from './outlet-type-list/outlet-type-list.component';

const outletTypeRoutes: Routes = [
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
				redirectTo: '/configuration/outlets/types',
				pathMatch: 'full'
			},
			{
				path: 'configuration/outlets/types',
				component: OutletTypeListComponent
			},
			{
				path: 'configuration/outlets/types/add',
				component: OutletTypeAddComponent
			},
			{
				path: 'configuration/outlets/types/:id/edit',
				component: OutletTypeEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(outletTypeRoutes);