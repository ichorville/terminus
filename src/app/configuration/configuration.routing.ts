import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletConfigComponent } from './outlet-config/outlet-config.component';


const configurationRoutes: Routes = [
	{
		path: '',
		redirectTo: '/configuration/outlets/classes',
		pathMatch: 'full'
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(configurationRoutes);