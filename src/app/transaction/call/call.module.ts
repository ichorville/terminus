import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { AgmCoreModule } from '@agm/core';
import { CallComponent } from './call.component'; 
import { CallListComponent} from './call-list/call-list.component';
import { CallDetailComponent } from './call-detail/call-detail.component';

import { CallService } from './call.service';

import { routing } from './call.routing';

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		routing,
		DynamicFormModule,
		AlertModule,
		DataTableModule,
		NgxGalleryModule,
		MaterialModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyB7xCCaCLiNRXf5b-zAb_wcs8cxtmYAFdQ'
		})
	],
	declarations: [
		CallComponent,
		CallListComponent,
		CallDetailComponent
	],
	providers: [
		CallService
	]
})

export class CallModule {}

