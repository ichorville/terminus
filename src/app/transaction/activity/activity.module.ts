import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { ActivityComponent } from './activity.component'; 
import { ActivityListComponent} from './activity-list/activity-list.component';

import { ActivityService } from './activity.service';

import { routing } from './activity.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		SimpleTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		ActivityComponent,
		ActivityListComponent,
	],
	providers: [
		ActivityService
	]
})

export class ActivityModule {}

