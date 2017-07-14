
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { routing } from './activities.routing';
import { StoreActivitiesListComponent } from './store-activities-list/store-activities-list.component';
import { StoreActivitiesAddComponent} from './store-activities-add/store-activities-add.component';
import { StoreActivitiesEditComponent } from './store-activities-edit/store-activities-edit.component';
import { StoreConfigNavTabModule } from '../store-config-nav-tab/store-config-nav-tab.module';

import {StoreActivitiesService} from './activities.service';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		AlertModule,
        FormsModule,
		StoreConfigNavTabModule
	],
	declarations: [
        StoreActivitiesAddComponent,
	    StoreActivitiesListComponent,
	    StoreActivitiesEditComponent
    ],
	providers: [ StoreActivitiesService
	]
})

export class ActivitiesModule {}



