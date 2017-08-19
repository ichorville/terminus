import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';

import { MerchandiserListComponent } from './merchandiser-list/merchandiser-list.component';
import { MerchandiserAddComponent } from './merchandiser-add/merchandiser-add.component';
import { MerchandiserDetailComponent } from './merchandiser-detail/merchandiser-detail.component';
import { MerchandiserEditComponent } from './merchandiser-edit/merchandiser-edit.component';

const merchandiserMasterRoutes: Routes = [
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
				redirectTo: '/master-data/merchandisers',
				pathMatch: 'full'
			},
			{
				path: 'master-data/merchandisers',
				component: MerchandiserListComponent
			},
			{
				path: 'master-data/merchandisers/add',
				component: MerchandiserAddComponent
			},
			{
				path: 'master-data/merchandisers/:id',
				component: MerchandiserDetailComponent
			},
			{
				path: 'master-data/merchandisers/:id/edit',
				component: MerchandiserEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(merchandiserMasterRoutes);