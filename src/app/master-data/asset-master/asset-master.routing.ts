import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { AssetMasterListComponent } from './asset-master-list/asset-master-list.component';
import { AssetMasterEditComponent } from './asset-master-edit/asset-master-edit.component';
import { AssetMasterDetailsComponent } from './asset-master-details/asset-master-details.component';

const assetMasterRoutes: Routes = [
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
				redirectTo: '/master-data/assets',
				pathMatch: 'full'
			},
			{
				path: 'master-data/assets',
				component: AssetMasterListComponent
			},
			{
				path: 'master-data/assets/:id',
				component: AssetMasterDetailsComponent
			},
			{
				path: 'master-data/assets/:id/edit',
				component: AssetMasterEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(assetMasterRoutes);