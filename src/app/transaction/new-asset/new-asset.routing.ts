import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { NewAssetListComponent } from './new-asset-list/new-asset-list.component';
import { NewAssetDetailComponent } from './new-asset-detail/new-asset-detail.component';
import { NewAssetAddComponent } from './new-asset-add/new-asset-add.component';
import { AssetRequestFormComponent } from './new-asset-request-form/asset-request-form.component';

const callRoutes: Routes = [
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
				redirectTo: 'transactions/new-assets',
				pathMatch: 'full'
			},
			{
				path: 'transactions/new-assets',
				component: NewAssetListComponent
			},
			{
				path: 'transactions/new-assets/add',
				component: NewAssetAddComponent
			},
			{
				path: 'transactions/new-assets/:id/detail',
				component: NewAssetDetailComponent
			},
			{
				path: 'transactions/new-assets/:id/form',
				component: AssetRequestFormComponent
			}
        ]
    }
]
export const routing: ModuleWithProviders = RouterModule.forChild(callRoutes);