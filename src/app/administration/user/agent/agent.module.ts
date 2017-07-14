import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../../shared/dynamic-form/dynamic-form.module';
import { UserNavTabModule } from '../user-nav-tab/user-nav-tab.module';

import { AgentAddComponent } from './agent-add/agent-add.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentListComponent } from './agent-list/agent-list.component';

import { AgentService } from './agent.service';

import { routing } from './agent.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		DataTableModule,
		DynamicFormModule,
        UserNavTabModule
	],
	declarations: [
		AgentAddComponent,
		AgentEditComponent,
		AgentListComponent
	],
	providers: [
		AgentService
	]
})

export class AgentModule {}