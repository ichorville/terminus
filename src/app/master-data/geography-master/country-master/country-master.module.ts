import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';

import { CountryMasterComponent } from './country-master.component'; 
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddComponent } from './country-add/country-add.component';
import { CountryEditComponent } from './country-edit/country-edit.component';

import { CountryMasterService } from './country-master.service';
import { GeographyNavTabModule } from '../geography-nav-tab/geography-nav-tab.module';

import { routing } from './country-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		GeographyNavTabModule
	],
	declarations: [
		CountryMasterComponent,
		CountryListComponent,
		CountryAddComponent,
		CountryEditComponent
	],
	providers: [
		CountryMasterService
	]
})

export class CountryMasterModule {}

