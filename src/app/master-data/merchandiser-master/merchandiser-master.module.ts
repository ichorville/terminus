import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';

import { MerchandiserMasterComponent } from './merchandiser-master.component'; 
import { MerchandiserListComponent } from './merchandiser-list/merchandiser-list.component';
import { MerchandiserAddComponent } from './merchandiser-add/merchandiser-add.component';
import { MerchandiserEditComponent } from './merchandiser-edit/merchandiser-edit.component';
import { MerchandiserDetailComponent } from './merchandiser-detail/merchandiser-detail.component';

import { routing } from './merchandiser-master.routing';

import { MerchandiserMasterService } from './merchandiser-master.service';

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
		MerchandiserMasterComponent,
		MerchandiserListComponent,
		MerchandiserAddComponent,
		MerchandiserEditComponent,
		MerchandiserDetailComponent
	],
	providers: [
		MerchandiserMasterService
	]
})

export class MerchandiserMasterModule {}
