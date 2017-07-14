import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';

import { ProductMasterComponent } from './product-master.component'; 
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { ProductMasterService } from './product-master.service';

import { routing } from './product-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule
	],
	declarations: [
		ProductMasterComponent,
		ProductListComponent,
		ProductAddComponent,
		ProductDetailComponent,
		ProductEditComponent	
	],
	providers: [
		ProductMasterService
	]
})

export class ProductMasterModule {}

