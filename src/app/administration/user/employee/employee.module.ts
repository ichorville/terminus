
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { UserNavTabModule } from '../user-nav-tab/user-nav-tab.module';

import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { EmployeeService } from './employee.service';

import { routing } from './employee.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule,
        UserNavTabModule
	],
	declarations: [
		EmployeeAddComponent,
		EmployeeEditComponent,
		EmployeeListComponent
	],
	providers: [
		EmployeeService
	]
})

export class EmployeeModule {}