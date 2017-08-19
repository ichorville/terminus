import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts'

import { DashboardComponent } from './dashboard.component';

import { routing } from './dashboard.routing';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		//NgxChartsModule,
		routing
	],
	declarations: [
		DashboardComponent
	]
})
export class DashboardModule { }
