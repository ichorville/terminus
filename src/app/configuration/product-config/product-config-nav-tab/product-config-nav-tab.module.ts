import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsModule } from '../../../shared/nav-tabs/nav-tabs.module';
import { ProductConfigNavTabComponent } from './product-config-nav-tab.component';

@NgModule({
	imports: [
		CommonModule,
		NavTabsModule
	],
	declarations: [
		ProductConfigNavTabComponent
	],
	exports: [
		ProductConfigNavTabComponent
	]
})

export class ProductConfigNavTabModule {}