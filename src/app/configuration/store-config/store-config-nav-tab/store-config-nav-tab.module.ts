import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsModule } from '../../../shared/nav-tabs/nav-tabs.module';
import { StoreConfigNavTabComponent } from './store-config-nav-tab.component';

@NgModule({
	imports: [
		CommonModule,
		NavTabsModule
	],
	declarations: [
		StoreConfigNavTabComponent
	],
	exports: [
		StoreConfigNavTabComponent
	]
})

export class StoreConfigNavTabModule {}