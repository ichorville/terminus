import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacilityTrackingComponent } from './facility-tracking.component';

const facilityTrackingRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'dashboards/facility-dashboard',
		component: FacilityTrackingComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(facilityTrackingRoutes);