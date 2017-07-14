import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryListComponent } from './country-master/country-list/country-list.component';

const geographyMasterRoutes: Routes = [
	{
		path: '',
		redirectTo: '/master-data/geographies/countries',
		pathMatch: 'full'
	},
	{
		path: 'master-data/geographies',
		redirectTo: '/master-data/geographies/countries',
		pathMatch: 'full'
	},
	{
		path: 'master-data/geographies/countries',
		component: CountryListComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(geographyMasterRoutes);