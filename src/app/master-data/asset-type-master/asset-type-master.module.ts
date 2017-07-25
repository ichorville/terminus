import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

import { AssetTypeMasterComponent } from './asset-type-master.component';
import { AssetTypeAddComponent } from './asset-type-add/asset-type-add.component';
import { AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import { AssetTypeDetailComponent } from './asset-type-detail/asset-type-detail.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';

import { routing } from './asset-type-master.routing';

@NgModule({
  imports: [
   CommonModule,
    routing,
    DataTableModule,
    DynamicFormModule,
    AlertModule
  ],
  declarations: [
                  AssetTypeMasterComponent,
                  AssetTypeAddComponent,
                  AssetTypeEditComponent,
                  AssetTypeDetailComponent,
                  AssetTypeListComponent                  
                ]
})
export class AssetTypeMasterModule { }
