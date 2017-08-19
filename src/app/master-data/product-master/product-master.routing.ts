import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';

import { ProductMasterComponent } from './product-master.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const productMasterRoutes: Routes = [
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
				redirectTo: '/master-data/products',
				pathMatch: 'full'
			},
			{
				path: 'master-data/products',
				component: ProductListComponent
			},
			{
				path: 'master-data/products/add',
				component: ProductAddComponent
			},
			{
				path: 'master-data/products/:id',
				component: ProductDetailComponent
			},
			{
				path: 'master-data/products/:id/edit',
				component: ProductEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(productMasterRoutes);