import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { OutletMasterComponent } from './outlet-master.component'; 
import { OutletListComponent } from './outlet-list/outlet-list.component';
import { OutletAddComponent } from './outlet-add/outlet-add.component';
import { OutletEditComponent } from './outlet-edit/outlet-edit.component';
import { OutletDetailComponent } from './outlet-detail/outlet-detail.component';

import { OutletMasterService } from './outlet-master.service';

import { routing } from './outlet-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule,
		AlertModule,
		MaterialModule
	],
	declarations: [
		OutletMasterComponent,
		OutletListComponent,
		OutletAddComponent,
		OutletDetailComponent,
		OutletEditComponent
	],
	providers: [
		OutletMasterService
	]
})

export class OutletMasterModule {}

