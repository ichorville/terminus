import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';
import { AssetMasterComponent } from './asset-master.component';

import { AssetMasterListComponent } from './asset-master-list/asset-master-list.component';
import { AssetMasterEditComponent } from './asset-master-edit/asset-master-edit.component';
import { AssetMasterDetailsComponent } from './asset-master-details/asset-master-details.component';

import { routing } from './asset-master.routing';


@NgModule({
  imports: [
    CommonModule,
    routing,
    DataTableModule,
    DynamicFormModule,
    AlertModule
  ],
  declarations: [AssetMasterComponent,
                AssetMasterListComponent,
                AssetMasterEditComponent,
                AssetMasterDetailsComponent              
                
                ]
})
export class AssetMasterModule { }
