import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyListComponent } from './survey-list/survey-list.component';

const surveyRoutes: Routes = [
	{
		path: '',
		redirectTo: '/transactions/surveys',
		pathMatch: 'full'
	},
	{
		path: 'transactions/surveys',
		component: SurveyListComponent
	}
]
export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);