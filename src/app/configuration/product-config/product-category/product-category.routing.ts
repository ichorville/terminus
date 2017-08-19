import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';

import { ProductCategoryAddComponent } from './product-category-add/product-category-add.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';

const productCategoryRoutes: Routes = [
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
				redirectTo: '/configuration/products/categories',
				pathMatch: 'full'
			},
			{
				path: 'configuration/products/categories',
				component: ProductCategoryListComponent
			},
			{
				path: 'configuration/products/categories/add',
				component: ProductCategoryAddComponent
			},
			{
				path: 'configuration/products/categories/:id/edit',
				component: ProductCategoryEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(productCategoryRoutes);