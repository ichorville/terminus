import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { PaginationModule } from '../pagination/pagination.module';
import { SearchModule } from '../search/search.module';

import { DataTableComponent } from './data-table.component';

import { PaginationService } from '../services/pagination.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PaginationModule,
		MaterialModule,
		SearchModule
	],
	declarations: [
		DataTableComponent
	],
	exports: [
		DataTableComponent
	],
	providers: [
		PaginationService
	]
})

export class DataTableModule {}