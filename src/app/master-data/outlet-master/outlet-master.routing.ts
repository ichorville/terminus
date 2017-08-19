import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';

import { OutletListComponent } from './outlet-list/outlet-list.component';
import { OutletAddComponent } from './outlet-add/outlet-add.component';
import { OutletDetailComponent } from './outlet-detail/outlet-detail.component';
import { OutletEditComponent } from './outlet-edit/outlet-edit.component';

const outletMasterRoutes: Routes = [
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
				redirectTo: '/master-data/outlets',
				pathMatch: 'full'
			},
			{
				path: 'master-data/outlets',
				component: OutletListComponent
			},
			{
				path: 'master-data/outlets/add',
				component: OutletAddComponent
			},
			{
				path: 'master-data/outlets/:id',
				component: OutletDetailComponent
			},
			{
				path: 'master-data/outlets/:id/edit',
				component: OutletEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(outletMasterRoutes);