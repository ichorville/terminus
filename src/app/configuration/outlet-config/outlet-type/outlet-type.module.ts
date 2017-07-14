import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { OutletConfigNavTabModule } from '../outlet-config-nav-tab/outlet-config-nav-tab.module';

import { OutletTypeAddComponent } from './outlet-type-add/outlet-type-add.component';
import { OutletTypeEditComponent } from './outlet-type-edit/outlet-type-edit.component';
import { OutletTypeListComponent } from './outlet-type-list/outlet-type-list.component';

import { routing } from './outlet-type.routing';

import { OutletTypeService } from './outlet-type.service';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		OutletConfigNavTabModule,
		AlertModule
	],
	declarations: [
		OutletTypeAddComponent,
	    OutletTypeEditComponent,
	    OutletTypeListComponent
    ],
	providers: [
		OutletTypeService		
	]
})

export class OutletTypeModule {}

