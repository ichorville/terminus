import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletClassModule } from './outlet-class/outlet-class.module';
import { OutletTypeModule } from './outlet-type/outlet-type.module';
import { OutletConfigComponent } from './outlet-config.component';

import { routing } from './outlet-config.routing';

@NgModule({
	imports: [
		routing,
		OutletClassModule,
		OutletTypeModule
	],
	declarations: [
		OutletConfigComponent
	]
})

export class OutletConfigModule {}

