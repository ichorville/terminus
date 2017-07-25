import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAssetsComponent } from './new-assets.component';
import {NewAssetsListComponent} from './new-assets-list/new-assets-list.component';
import {NewAssetsEditComponent} from './new-assets-edit/new-assets-edit.component';
import {NewAssetsAddComponent} from './new-assets-add/new-assets-add.component';
import {NewAssetsDetailComponent} from './new-assets-detail/new-assets-detail.component';

import { routing } from './new-assets.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ NewAssetsComponent,
                  NewAssetsListComponent,
                  NewAssetsEditComponent,
                  NewAssetsAddComponent,
                  NewAssetsDetailComponent
  
  ]
})
export class NewAssetsModule { }


