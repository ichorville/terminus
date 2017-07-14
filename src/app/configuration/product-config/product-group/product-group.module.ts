import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { ProductGroupListComponent } from './product-group-list/product-group-list.component';
import { ProductGroupAddComponent } from './product-group-add/product-group-add.component';
import { ProductGroupEditComponent } from './product-group-edit/product-group-edit.component';

import { routing } from './product-group.routing';

import { ProductGroupService } from './product-group.service';
import { ProductConfigNavTabModule } from '../product-config-nav-tab/product-config-nav-tab.module';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		AlertModule,
		ProductConfigNavTabModule
	],
	declarations: [
		ProductGroupListComponent,
		ProductGroupAddComponent,
		ProductGroupEditComponent
	],
	providers: [
		ProductGroupService
	]
})

export class ProductGroupModule {}

