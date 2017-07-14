import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownListComponent } from './town-list/town-list.component';
import { TownAddComponent } from './town-add/town-add.component';
import { TownEditComponent } from './town-edit/town-edit.component';

const townMasterRoutes: Routes = [
	{
		path: '',
		redirectTo: '/master-data/geographies/towns',
		pathMatch: 'full'
	},
	{
		path: 'master-data/geographies/towns',
		component: TownListComponent
	},
	{
		path: 'master-data/geographies/towns/add',
		component: TownAddComponent
	},
	{
		path: 'master-data/geographies/towns/:id/edit',
		component: TownEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(townMasterRoutes);