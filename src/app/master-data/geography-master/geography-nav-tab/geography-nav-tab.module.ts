import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavTabsModule } from '../../../shared/nav-tabs/nav-tabs.module';
import { GeographyNavTabComponent } from './geography-nav-tab.component';

@NgModule({
	imports: [
		CommonModule,
		NavTabsModule
	],
	declarations: [
		GeographyNavTabComponent
	],
	exports: [
		GeographyNavTabComponent
	]
})

export class GeographyNavTabModule {}