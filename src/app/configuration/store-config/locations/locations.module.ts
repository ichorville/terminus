
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { routing } from './locations.routing';
import { StoreLocationsListComponent } from './store-locations-list/store-locations-list.component';
import { StoreLocationsAddComponent} from './store-locations-add/store-locations-add.component';
import { StoreLocationsEditComponent } from './store-locations-edit/store-locations-edit.component';
import { StoreConfigNavTabModule } from '../store-config-nav-tab/store-config-nav-tab.module';
import {StoreLocationsService} from './locations.service';

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
        StoreLocationsAddComponent,
	    StoreLocationsListComponent,
	    StoreLocationsEditComponent
    ],
	providers: [ StoreLocationsService
	]
})

export class LocationsModule {}



