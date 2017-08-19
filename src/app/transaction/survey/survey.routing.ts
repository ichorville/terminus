import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../sidenav/sidenav.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const surveyRoutes: Routes = [
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
				redirectTo: '/transactions/surveys',
				pathMatch: 'full'
			},
			{
				path: 'transactions/surveys',
				component: SurveyListComponent
			}
        ]
    }
]
export const routing: ModuleWithProviders = RouterModule.forChild(surveyRoutes);