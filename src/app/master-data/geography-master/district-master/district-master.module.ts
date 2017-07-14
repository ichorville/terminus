import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';

import { DistrictMasterComponent } from './district-master.component'; 
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictAddComponent } from './district-add/district-add.component';
import { DistrictEditComponent } from './district-edit/district-edit.component';

import { DistrictMasterService } from './district-master.service';
import { GeographyNavTabModule } from '../geography-nav-tab/geography-nav-tab.module';

import { routing } from './district-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		GeographyNavTabModule
	],
	declarations: [
		DistrictMasterComponent,
		DistrictListComponent,
		DistrictAddComponent,
		DistrictEditComponent
	],
	providers: [
		DistrictMasterService
	]
})

export class DistrictMasterModule {}

