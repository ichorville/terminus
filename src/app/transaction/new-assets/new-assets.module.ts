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
import { CallComponent } from './new-assets.component'; 
import { CallListComponent} from './new-assets-list/call-list.component';
import { CallDetailComponent } from './new-assets-detail/call-detail.component';
import { AssetRequestFormComponent } from './new-assets-request-form/asset-request-form.component';

import { CallService } from './new-assets.service';

import { routing } from './new-assets.routing';

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
		CallDetailComponent,
		AssetRequestFormComponent
	],
	providers: [
		CallService
	]
})

export class NewAssetsModule {}

