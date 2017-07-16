import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavTabsComponent } from './nav-tabs.component';
import { MaterialModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule
	],
	declarations: [
		NavTabsComponent
	],
	exports: [
		NavTabsComponent
	]
})

export class NavTabsModule {}