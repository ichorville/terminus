import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../shared/data-table/data-table.module';
import { DynamicFormModule } from '../shared/dynamic-form/dynamic-form.module';

import { AdministrationComponent } from './administration.component';

import { UserModule } from './user/user.module';


@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule,
        UserModule
	],
	declarations: [
		AdministrationComponent
	],
	providers: []
})

export class AdministrationModule {}