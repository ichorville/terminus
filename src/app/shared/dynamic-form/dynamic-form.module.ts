import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { MaterialModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	declarations: [
		DynamicFormComponent
	],
	exports: [
		DynamicFormComponent
	]
})

export class DynamicFormModule {}