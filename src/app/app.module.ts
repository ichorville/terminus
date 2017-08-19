import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MasterDataModule } from './master-data/master-data.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { HomeModule } from './home/home.module';
import { AdministrationModule } from './administration/administration.module';
// import { LogModule } from './log/log.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { TransactionModule } from './transaction/transaction.module';
import { LoginModule } from './login/login.module';

import { AuthModule } from './auth/auth.module';

import 'hammerjs';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { routing } from './app.routing';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		LoginModule,
		HomeModule,		
		MasterDataModule,
		ConfigurationModule,
		AdministrationModule,
		// LogModule,
		// DashboardModule,
		TransactionModule,
		AuthModule,
		routing,
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
