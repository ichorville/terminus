import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavTabsModule } from '../../../shared/nav-tabs/nav-tabs.module';
import { UserNavTabComponent } from './user-nav-tab.component';

@NgModule({
	imports: [
		CommonModule,
		NavTabsModule
	],
	declarations: [
		UserNavTabComponent
	],
	exports: [
		UserNavTabComponent
	]
})

export class UserNavTabModule {}