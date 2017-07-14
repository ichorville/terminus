import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { SurveyComponent } from './survey.component'; 
import { SurveyListComponent} from './survey-list/survey-list.component';

import { SurveyService } from './survey.service';

import { routing } from './survey.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		SimpleTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		SurveyComponent,
		SurveyListComponent,
	],
	providers: [
		SurveyService
	]
})

export class SurveyModule {}

