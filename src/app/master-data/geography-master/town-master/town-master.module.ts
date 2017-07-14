import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';

import { TownMasterComponent } from './town-master.component'; 
import { TownListComponent } from './town-list/town-list.component';
import { TownAddComponent } from './town-add/town-add.component';
import { TownEditComponent } from './town-edit/town-edit.component';

import { TownMasterService } from './town-master.service';
import { GeographyNavTabModule } from '../geography-nav-tab/geography-nav-tab.module';

import { routing } from './town-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		GeographyNavTabModule
	],
	declarations: [
		TownMasterComponent,
		TownListComponent,
		TownAddComponent,
		TownEditComponent
	],
	providers: [
		TownMasterService
	]
})

export class TownMasterModule {}

