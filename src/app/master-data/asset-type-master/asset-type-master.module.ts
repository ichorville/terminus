import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetTypeMasterComponent } from './asset-type-master.component';
import { AssetTypeAddComponent } from './asset-type-add/asset-type-add.component';
import { AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import { AssetTypeDetailComponent } from './asset-type-detail/asset-type-detail.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';

import { routing } from './asset-type-master.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
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
