import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleTableComponent } from './simple-table.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		SimpleTableComponent
	],
	exports: [
		SimpleTableComponent
	]
})

export class SimpleTableModule {}