import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsModule } from './locations/locations.module';
import { ActivitiesModule } from './activities/activities.module';
import { StoreConfigComponent } from './store-config.component';

import { routing } from './store-config.routing';

@NgModule({
	imports: [
		routing,
		LocationsModule,
		ActivitiesModule
	],
	declarations: [
		StoreConfigComponent,
	]
})

export class StoreConfigModule {}

