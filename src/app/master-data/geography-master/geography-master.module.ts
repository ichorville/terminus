import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CountryMasterModule } from './country-master/country-master.module'; 
import { RegionMasterModule } from './region-master/region-master.module';
import { DistrictMasterModule } from './district-master/district-master.module';
import { TownMasterModule } from './town-master/town-master.module';

import { routing } from './geography-master.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		CountryMasterModule,
		RegionMasterModule,
		DistrictMasterModule,
		TownMasterModule,
		BrowserAnimationsModule
	],
})

export class GeographyMasterModule {}

