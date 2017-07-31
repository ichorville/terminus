import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { routing } from './app.routing';

import './rxjs-extensions';
import { MasterDataModule } from './master-data/master-data.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { HomeModule } from './home/home.module';
import { AdministrationModule } from './administration/administration.module';
// import { LogModule } from './log/log.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import {TransactionModule} from './transaction/transaction.module';




import 'hammerjs';

import { AppComponent } from './app.component';


@NgModule({
	declarations: [
		AppComponent,
			],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		HomeModule,		
		MasterDataModule,
		ConfigurationModule,
		AdministrationModule,
		// LogModule,
		// DashboardModule,
		TransactionModule
	],
	providers: [

	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
