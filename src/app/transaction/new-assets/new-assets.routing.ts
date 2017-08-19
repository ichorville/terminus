import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';

import { NewAssetsComponent } from './new-assets.component';
import { NewAssetsListComponent } from './new-assets-list/new-assets-list.component';
import { NewAssetsEditComponent } from './new-assets-edit/new-assets-edit.component';
import { NewAssetsAddComponent } from './new-assets-add/new-assets-add.component';
import { NewAssetsDetailComponent } from './new-assets-detail/new-assets-detail.component';

const NewAssetsRoutes: Routes = [
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
				redirectTo: '/transactions/new-assets',
				pathMatch: 'full'
			},
			{
				path: 'transactions/new-assets',
				component: NewAssetsListComponent
			},
			{
				path: 'transactions/new-assets/add',
				component: NewAssetsAddComponent
			},
			{
				path: 'transactions/new-assets/:id',
				component: NewAssetsDetailComponent
			},
			{
				path: 'transactions/new-assets/:id/edit',
				component: NewAssetsEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(NewAssetsRoutes);