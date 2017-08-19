import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryEditComponent } from './country-edit/country-edit.component';

const countryMasterRoutes: Routes = [
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
				redirectTo: '/master-data/geographies/countries',
				pathMatch: 'full'
			},
			{
				path: 'master-data/geographies/countries',
				component: CountryListComponent
			},
			{
				path: 'master-data/geographies/countries/add',
				component: CountryAddComponent
			},
			{
				path: 'master-data/geographies/countries/:id/edit',
				component: CountryEditComponent
			}
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(countryMasterRoutes);