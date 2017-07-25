import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAssetsComponent } from './new-assets.component';
import {NewAssetsListComponent} from './new-assets-list/new-assets-list.component';
import {NewAssetsEditComponent} from './new-assets-edit/new-assets-edit.component';
import {NewAssetsAddComponent} from './new-assets-add/new-assets-add.component';
import {NewAssetsDetailComponent} from './new-assets-detail/new-assets-detail.component';

const NewAssetsRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/newassets',
		pathMatch: 'full'
	},
	{
		path: 'transactions/newassets',
		component: NewAssetsListComponent
	},
	{
		path: 'transactions/newassets/add',
		component: NewAssetsAddComponent
	},
	{
		path: 'transactions/newassets/:id',
		component: NewAssetsDetailComponent
	},
	{
		path: 'transactions/newassets/:id/edit',
		component: NewAssetsEditComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(NewAssetsRoutes);