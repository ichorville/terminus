import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictAddComponent } from './district-add/district-add.component';
import { DistrictEditComponent } from './district-edit/district-edit.component';

const districtMasterRoutes: Routes = [
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
				redirectTo: '/master-data/geographies/districts',
				pathMatch: 'full'
			},
			{
				path: 'master-data/geographies/districts',
				component: DistrictListComponent
			},
			{
				path: 'master-data/geographies/districts/add',
				component: DistrictAddComponent
			},
			{
				path: 'master-data/geographies/districts/:id/edit',
				component: DistrictEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(districtMasterRoutes);