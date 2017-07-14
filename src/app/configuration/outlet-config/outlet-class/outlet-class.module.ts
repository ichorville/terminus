import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { OutletClassListComponent } from './outlet-class-list/outlet-class-list.component';
import { OutletClassAddComponent } from './outlet-class-add/outlet-class-add.component';
import { OutletClassEditComponent } from './outlet-class-edit/outlet-class-edit.component';
import { OutletConfigNavTabModule } from '../outlet-config-nav-tab/outlet-config-nav-tab.module';


import { routing } from './outlet-class.routing';

import { OutletClassService } from './outlet-class.service';


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
		OutletClassListComponent,
		OutletClassAddComponent,
		OutletClassEditComponent,
	],
	providers: [
		OutletClassService		
	]
})

export class OutletClassModule {}

