import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';
import { AssetSupplierMasterComponent } from './asset-supplier-master.component';

import {AssetSupplierAddComponent} from './asset-supplier-add/asset-supplier-add.component';
import {AssetSupplierDetailComponent} from './asset-supplier-detail/asset-supplier-detail.component';
import {AssetSupplierEditComponent} from './asset-supplier-edit/asset-supplier-edit.component';
import {AssetSupplierListComponent} from './asset-supplier-list/asset-supplier-list.component';

import { routing } from './asset-supplier-master.routing';


@NgModule({
  imports: [
    CommonModule,
    routing,
    DataTableModule,
    DynamicFormModule
  ],
  declarations: [
                  AssetSupplierMasterComponent,
                  AssetSupplierAddComponent,
                  AssetSupplierDetailComponent,
                  AssetSupplierEditComponent,
                  AssetSupplierListComponent
                ]
})
export class AssetSupplierMasterModule { }
