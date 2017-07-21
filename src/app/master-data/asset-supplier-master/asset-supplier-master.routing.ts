import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AssetSupplierAddComponent} from './asset-supplier-add/asset-supplier-add.component';
import {AssetSupplierDetailComponent} from './asset-supplier-detail/asset-supplier-detail.component';
import {AssetSupplierEditComponent} from './asset-supplier-edit/asset-supplier-edit.component';
import {AssetSupplierListComponent} from './asset-supplier-list/asset-supplier-list.component';

const supplierMasterRoutes: Routes = [
	{
		path: '',
		redirectTo: '/master-data/suppliers',
		pathMatch: 'full'
	},
	{
		path: 'master-data/suppliers',
		component: AssetSupplierListComponent
	},
	{
		path: 'master-data/suppliers/add',
		component: AssetSupplierAddComponent
	},
	{
		path: 'master-data/suppliers/:id',
		component: AssetSupplierDetailComponent
	},
	{
		path: 'master-data/suppliers/:id/edit',
		component: AssetSupplierEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(supplierMasterRoutes);