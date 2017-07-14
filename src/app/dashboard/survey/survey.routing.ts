import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './survey.component';

const surveyRoutes: Routes = [
	{
		path: '',
		redirectTo: '/dashboards/surveys',
		pathMatch: 'full'
	},
	{
		path: 'dashboards/surveys',
		component: SurveyComponent
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);