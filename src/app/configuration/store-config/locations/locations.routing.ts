import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreLocationsListComponent } from './store-locations-list/store-locations-list.component';
import { StoreLocationsAddComponent } from './store-locations-add/store-locations-add.component';
import { StoreLocationsEditComponent } from './store-locations-edit/store-locations-edit.component';

const storeActivityConfigRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/store/locations',
		pathMatch: 'full'
	},
	{
		path: 'configuration/store/locations',
		component: StoreLocationsListComponent
	},
	{
		path: 'configuration/store/locations/add',
		component: StoreLocationsAddComponent
	},
	{   
		 path: 'configuration/store/locations/:id/edit',
	 	 component: StoreLocationsEditComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(storeActivityConfigRoutes);