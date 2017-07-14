import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivityModule } from './activity/activity.module';
import { SurveyModule } from './survey/survey.module';
import { CallModule } from './call/call.module';

import { routing } from './transaction.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
        ActivityModule,
        SurveyModule,
        CallModule
	],
})

export class TransactionModule {}
