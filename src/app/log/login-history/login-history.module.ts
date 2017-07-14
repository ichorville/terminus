import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { LoginHistoryComponent } from './login-history.component'; 
import { LoginHistoryListComponent} from './login-history-list/login-history-list.component';

import { LoginHistoryService } from './login-history.service';

import { routing } from './login-history.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		SimpleTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		LoginHistoryComponent,
		LoginHistoryListComponent,
	],
	providers: [
		LoginHistoryService
	]
})

export class LoginHistoryModule {}

