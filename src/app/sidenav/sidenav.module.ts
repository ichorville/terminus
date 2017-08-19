import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SidenavComponent } from './sidenav.component';

import { routing } from './sidenav.routing';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		routing
	],
	declarations: [
		SidenavComponent
	]
})
export class SidenavModule { }
