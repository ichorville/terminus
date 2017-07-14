import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-master/product-list/product-list.component';
import { ProductMasterComponent } from './product-master/product-master.component';

const masterDataRoutes: Routes = [
	{
		path: '',
		redirectTo: '/master-data/products',
		pathMatch: 'full'
	}/*,
	{
		path: 'master-data/outlets',
		component: OutletMaster
	},
	{
		path: 'master-data/merchandisers',
		component: MerchandiserMaster
	},
	{
		path: 'master-data/geographies',
		component: OutletEditComponent
	}*/
]

export const routing: ModuleWithProviders = RouterModule.forChild(masterDataRoutes);