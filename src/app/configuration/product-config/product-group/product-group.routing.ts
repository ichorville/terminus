import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductGroupListComponent } from './product-group-list/product-group-list.component';
import { ProductGroupAddComponent } from './product-group-add/product-group-add.component';
import { ProductGroupEditComponent } from './product-group-edit/product-group-edit.component';

const productClassRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/products/groups',
		pathMatch: 'full'
	},
	{
		path: 'configuration/products/groups',
		component: ProductGroupListComponent
	},
	{
		path: 'configuration/products/groups/add',
		component: ProductGroupAddComponent
	},
	{
		path: 'configuration/products/groups/:id/edit',
		component: ProductGroupEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(productClassRoutes);