import { ModuleWithProviders } 	from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav.component';
import { HomeComponent } from '../home/home.component';

import { AuthGuard } from '../auth/auth.guard';

const sidenavRoutes: Routes = [
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
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(sidenavRoutes);