import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from '../../../sidenav/sidenav.component';
import { AgentAddComponent } from './agent-add/agent-add.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentListComponent } from './agent-list/agent-list.component';

const agentRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: '',
		component: SidenavComponent,
		children: [
			{
				path: '',
				redirectTo: 'administration/users/agents',
				pathMatch: 'full'
			},
			{
				path: 'administration/users/agents',
				component: AgentListComponent
			},
			{
				path: 'administration/users/agents/add',
				component: AgentAddComponent
			},
			{
				path: 'administration/users/agents/:id/edit',
				component: AgentEditComponent
			}
		]
	}
]

export const routing: ModuleWithProviders = RouterModule.forChild(agentRoutes);
