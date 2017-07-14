import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginHistoryModule } from './login-history/login-history.module';
import { MobileErrorLogModule } from './mobile-error-log/mobile-error-log.module';

import { routing } from './log.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
        MobileErrorLogModule,
        LoginHistoryModule
	],
})

export class LogModule {}

