import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreActivityListComponent } from './store-activity-list/store-activity-list.component';
import { StoreActivityAddComponent } from './store-activity-add/store-activity-add.component';
//import { StoreActivityDetailComponent } from './store-activity-detail/store-activity-detail.component';
import { StoreActivityEditComponent } from './store-activity-edit/store-activity-edit.component';

const storeActivityConfigRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/activities/store',
		pathMatch: 'full'
	},
	
	{
		path: 'configuration/activities/store',
		component: StoreActivityListComponent
	},
	{
		path: 'configuration/activities/store/add',
		component: StoreActivityAddComponent
	},
	 {
		path: 'configuration/activities/store/:id',
	 	component: StoreActivityEditComponent
	 },
	// {
	// 	path: 'configuration/activities/store/:id/edit',
	// 	component: StoreActivityAddComponent
	// }
]

export const routing: ModuleWithProviders = RouterModule.forChild(storeActivityConfigRoutes);