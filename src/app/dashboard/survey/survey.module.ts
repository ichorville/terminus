import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
//import { NgxChartsModule } from '@swimlane/ngx-charts'

import { SurveyComponent } from './survey.component';
import { SurveyService } from './survey.service';

import { SimpleSearchModule } from '../../shared/simple-search-box/simple-search-box.module';

import { routing } from './survey.routing';


@NgModule({
  imports: [
		CommonModule,
		MaterialModule,
		//NgxChartsModule,
		routing,
		SimpleSearchModule
	],
	declarations: [
		SurveyComponent	
	],
	providers: [
		SurveyService
	]
})
export class SurveyModule { }


