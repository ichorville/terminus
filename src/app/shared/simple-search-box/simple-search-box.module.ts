import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleSearchBoxComponent } from './simple-search-box.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		SimpleSearchBoxComponent
	],
	exports: [
		SimpleSearchBoxComponent
	]
})

export class SimpleSearchModule {}