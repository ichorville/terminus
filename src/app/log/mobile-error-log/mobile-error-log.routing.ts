import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileErrorLogListComponent } from './mobile-error-log-list/mobile-error-log-list.component';
import {MobileErrorLogComponent} from './mobile-error-log.component'
const storeActivityConfigRoutes: Routes = [
	{
		path: '',
		redirectTo: '/log/mobile-error-log',
		pathMatch: 'full'
	},
	{
		path: 'log/mobile-error-log',
		component: MobileErrorLogListComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(storeActivityConfigRoutes);