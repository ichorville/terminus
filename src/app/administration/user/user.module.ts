import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { UserNavTabModule } from './user-nav-tab/user-nav-tab.module';
import { EmployeeModule } from './employee/employee.module';
import { AgentModule } from './agent/agent.module';

import { UserComponent } from './user.component';

import { routing } from './user.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule,
		UserNavTabModule,
		EmployeeModule,
		AgentModule
	],
	declarations: [
		UserComponent
	]
})

export class UserModule {}