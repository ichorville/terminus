import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';

import { OutletClassListComponent } from './outlet-class-list/outlet-class-list.component';
import { OutletClassAddComponent } from './outlet-class-add/outlet-class-add.component';
import { OutletClassEditComponent } from './outlet-class-edit/outlet-class-edit.component';

const outletClassRoutes: Routes = [
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
				redirectTo: '/configuration/outlets/classes',
				pathMatch: 'full'
			},
			{
				path: 'configuration/outlets/classes',
				component: OutletClassListComponent
			},
			{
				path: 'configuration/outlets/classes/add',
				component: OutletClassAddComponent
			},
			{
				path: 'configuration/outlets/classes/:id/edit',
				component: OutletClassEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(outletClassRoutes);