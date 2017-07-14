import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';
import { ProductTypeEditComponent } from './product-type-edit/product-type-edit.component';

const productTypeRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/products/types',
		pathMatch: 'full'
	},
	{
		path: 'configuration/products/types',
		component: ProductTypeListComponent
	},
	{
		path: 'configuration/products/types/add',
		component: ProductTypeAddComponent
	},
	{
		path: 'configuration/products/types/:id/edit',
		component: ProductTypeEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(productTypeRoutes);