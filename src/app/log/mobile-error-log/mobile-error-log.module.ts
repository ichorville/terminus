import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { MobileErrorLogComponent } from './mobile-error-log.component'; 
import { MobileErrorLogListComponent} from './mobile-error-log-list/mobile-error-log-list.component';

import { MobileErrorLogService } from './mobile-error-log.service';

import { routing } from './mobile-error-log.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		SimpleTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
		MobileErrorLogComponent,
		MobileErrorLogListComponent,
	],
	providers: [
		MobileErrorLogService
	]
})

export class MobileErrorLogModule {}

