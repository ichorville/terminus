import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletsComponent } from './outlets/outlets.component';
import { ProductsComponent } from './products/products.component';

import { SidenavComponent } from '../../sidenav/sidenav.component';

const merchandiserConfigRoutes: Routes = [
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
				redirectTo: '/configuration/merchandisers/outlets',
				pathMatch: 'full'
			},
			{
				path: 'configuration/merchandisers',
				redirectTo: '/configuration/merchandisers/outlets',
				pathMatch: 'full'
			},
			{
				path: 'configuration/merchandisers/outlets',
				component: OutletsComponent
			},
			{
				path: 'configuration/merchandisers/products',
				component: ProductsComponent
			}
		]
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(merchandiserConfigRoutes);