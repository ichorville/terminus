import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';

import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';
import { ProductTypeEditComponent } from './product-type-edit/product-type-edit.component';

import { routing } from './product-type.routing';

import { ProductTypeService } from './product-type.service';
import { ProductConfigNavTabModule } from '../product-config-nav-tab/product-config-nav-tab.module';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		ProductConfigNavTabModule
	],
	declarations: [
		ProductTypeListComponent,
		ProductTypeAddComponent,
		ProductTypeEditComponent
	],
	providers: [
		ProductTypeService
	]
})

export class ProductTypeModule {}

