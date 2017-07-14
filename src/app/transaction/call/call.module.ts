import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { CallComponent } from './call.component'; 
import { CallListComponent} from './call-list/call-list.component';

import { CallService } from './call.service';

import { routing } from './call.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		SimpleTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		CallComponent,
		CallListComponent,
	],
	providers: [
		CallService
	]
})

export class CallModule {}

