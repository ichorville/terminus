import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
//import { NgxChartsModule } from '@swimlane/ngx-charts'
import { SurveyModule } from './survey/survey.module';

import { routing } from './dashboard.routing';

@NgModule({
	imports: [
		CommonModule,
		//MaterialModule.forRoot(),
		//NgxChartsModule,
		routing,
		SurveyModule
	]
})
export class DashboardModule { }
