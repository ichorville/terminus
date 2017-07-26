import { NgModule } 	from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { routing } from './home.routing';

@NgModule({
	imports: [
		CommonModule, 
		BrowserModule,
		MaterialModule,
		FormsModule,
		routing
	],
	declarations: [
		HomeComponent
	],
	providers: []
})

export class HomeModule {}