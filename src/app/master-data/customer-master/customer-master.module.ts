import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { CustomerMasterComponent } from './customer-master.component'; 
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

import { CustomerMasterService } from './customer-master.service';

import { routing } from './customer-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		CustomerMasterComponent,
		CustomerListComponent,
		CustomerAddComponent,
		CustomerEditComponent,
		CustomerDetailComponent
	],
	providers: [
		CustomerMasterService
	]
})

export class CustomerMasterModule {}

