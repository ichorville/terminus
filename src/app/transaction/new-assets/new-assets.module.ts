import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { NewAssetsComponent } from './new-assets.component';
import {NewAssetsListComponent} from './new-assets-list/new-assets-list.component';
import {NewAssetsEditComponent} from './new-assets-edit/new-assets-edit.component';
import {NewAssetsAddComponent} from './new-assets-add/new-assets-add.component';
import {NewAssetsDetailComponent} from './new-assets-detail/new-assets-detail.component';

import { routing } from './new-assets.routing';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    DynamicFormModule,
    AlertModule,

  ],
  declarations: [ NewAssetsComponent,
                  NewAssetsListComponent,
                  NewAssetsEditComponent,
                  NewAssetsAddComponent,
                  NewAssetsDetailComponent
  
  ]
})
export class NewAssetsModule { }


