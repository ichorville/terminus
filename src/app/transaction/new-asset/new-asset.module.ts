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

import { NewAssetListComponent } from './new-asset-list/new-asset-list.component';
import { NewAssetDetailComponent } from './new-asset-detail/new-asset-detail.component';
import { AssetRequestFormComponent } from './new-asset-request-form/asset-request-form.component';
import { NewAssetAddComponent } from './new-asset-add/new-asset-add.component';

import { NewAssetService } from './new-asset.service';
import { CallService } from './call.service';

import { routing } from './new-asset.routing';


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
		NewAssetListComponent,
		NewAssetDetailComponent,
		AssetRequestFormComponent,
		NewAssetAddComponent
	],
	providers: [
		CallService,
		NewAssetService
	]
})

export class NewAssetsModule {}

