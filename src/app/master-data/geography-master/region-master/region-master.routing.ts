import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionEditComponent } from './region-edit/region-edit.component';

const regionMasterRoutes: Routes = [
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
				redirectTo: '/master-data/geographies/regions',
				pathMatch: 'full'
			},
			{
				path: 'master-data/geographies/regions',
				component: RegionListComponent
			},
			{
				path: 'master-data/geographies/regions/add',
				component: RegionAddComponent
			},
			{
				path: 'master-data/geographies/regions/:id/edit',
				component: RegionEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(regionMasterRoutes);