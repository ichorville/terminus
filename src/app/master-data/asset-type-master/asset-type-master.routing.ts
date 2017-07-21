import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetTypeMasterComponent } from './asset-type-master.component';
import { AssetTypeAddComponent } from './asset-type-add/asset-type-add.component';
import { AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import { AssetTypeDetailComponent } from './asset-type-detail/asset-type-detail.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';

const assetTypeMasterRoutes: Routes = [
	{
		path: '',
		redirectTo: '/master-data/asset-types',
		pathMatch: 'full'
	},
	{
		path: 'master-data/asset-types',
		component: AssetTypeListComponent
	},
	{
		path: 'master-data/asset-types/add',
		component: AssetTypeAddComponent
	},
	{
		path: 'master-data/asset-types/:id',
		component: AssetTypeDetailComponent
	},
	{
		path: 'master-data/asset-types/:id/edit',
		component: AssetTypeEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(assetTypeMasterRoutes);