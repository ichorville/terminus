import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabsModule } from '../../../shared/nav-tabs/nav-tabs.module';
import { OutletConfigNavTabComponent } from './outlet-config-nav-tab.component';

@NgModule({
	imports: [
		CommonModule,
		NavTabsModule
	],
	declarations: [
		OutletConfigNavTabComponent
	],
	exports: [
		OutletConfigNavTabComponent
	]
})

export class OutletConfigNavTabModule {}