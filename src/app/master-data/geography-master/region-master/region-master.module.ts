import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';

import { RegionMasterComponent } from './region-master.component'; 
import { RegionListComponent } from './region-list/region-list.component';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionEditComponent } from './region-edit/region-edit.component';

import { RegionMasterService } from './region-master.service';
import { GeographyNavTabModule } from '../geography-nav-tab/geography-nav-tab.module';

import { routing } from './region-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		GeographyNavTabModule,
		BrowserAnimationsModule
	],
	declarations: [
		RegionMasterComponent,
		RegionListComponent,
		RegionAddComponent,
		RegionEditComponent
	],
	providers: [
		RegionMasterService
	]
})

export class RegionMasterModule {}

