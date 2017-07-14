import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../../shared/alert/alert.module';

import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryAddComponent } from './product-category-add/product-category-add.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';

import { routing } from './product-category.routing';

import { ProductCategoryService } from './product-category.service';
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
		ProductCategoryComponent,
		ProductCategoryAddComponent,
		ProductCategoryListComponent,
		ProductCategoryEditComponent
	],
	providers: [
		ProductCategoryService
	]
})

export class ProductCategoryModule {}

