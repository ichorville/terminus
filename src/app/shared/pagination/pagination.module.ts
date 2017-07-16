import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PaginationComponent }  from './pagination.component';

@NgModule({
	imports: [ 
		BrowserModule,
		FormsModule,
		HttpModule
	],
	declarations: [ 
		 PaginationComponent 
	],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule { }