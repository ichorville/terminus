import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MaterialModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	declarations: [
		PaginationComponent
	],
	exports: [
		PaginationComponent
	]
})
export class PaginationModule { }
