import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '../pagination/pagination.module';
import { DataTableComponent } from './data-table.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PaginationModule
	],
	declarations: [
		DataTableComponent
	],
	exports: [
		DataTableComponent
	]
})

export class DataTableModule {}