import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavTabsComponent } from './nav-tabs.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		NavTabsComponent
	],
	exports: [
		NavTabsComponent
	]
})

export class NavTabsModule {}