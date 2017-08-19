import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';

import { StoreActivitiesListComponent } from './store-activities-list/store-activities-list.component';
import { StoreActivitiesAddComponent } from './store-activities-add/store-activities-add.component';
import { StoreActivitiesEditComponent } from './store-activities-edit/store-activities-edit.component';

const storeActivityConfigRoutes: Routes = [
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
				redirectTo: '/configuration/store/activities',
				pathMatch: 'full'
			},
			
			{
				path: 'configuration/store/activities',
				component: StoreActivitiesListComponent
			},
			{
				path: 'configuration/store/activities/add',
				component: StoreActivitiesAddComponent
			},
			{   
				 path: 'configuration/store/activities/:id/edit',
				  component: StoreActivitiesEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(storeActivityConfigRoutes);