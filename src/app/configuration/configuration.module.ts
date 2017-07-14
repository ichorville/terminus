import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletConfigModule } from './outlet-config/outlet-config.module';
import { ProductConfigModule } from './product-config/product-config.module';
import { MerchandiserConfigModule } from './merchandiser-config/merchandiser-config.module';
import { StoreActivityConfigModule } from './store-activity-config/store-activity-config.module';
import {StoreConfigModule} from './store-config/store-config.module';
//import { ConfigurationComponent } from './configuration.component';

import { routing } from './configuration.routing';

//import { ActivitiesModule } from './store-config/activities/activities.module';
//import { StoreLocationAddComponent } from './store-config/locations/store-location-add/store-location-add.component';
//import { StoreLocationListComponent } from './store-config/locations/store-location-list/store-location-list.component';
//import { StoreLocationEditComponent } from './store-config/locations/store-location-edit/store-location-edit.component';


@NgModule({
	imports: [
		routing,
		OutletConfigModule,
		ProductConfigModule,
		MerchandiserConfigModule,
		StoreActivityConfigModule,
		StoreConfigModule
	],
	//declarations: [ConfigurationComponent, StoreLocationAddComponent, StoreLocationListComponent, StoreLocationEditComponent]
})

export class ConfigurationModule {}
