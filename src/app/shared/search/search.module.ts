import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { SearchComponent }  from './search.component';

@NgModule({
	imports: [ 
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule
	],
	declarations: [ 
		SearchComponent
	],
	exports: [ 
		SearchComponent 
	]
})
export class SearchModule { }
