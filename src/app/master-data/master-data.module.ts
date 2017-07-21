import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { GeographyMasterModule } from './geography-master/geography-master.module';
import { MerchandiserMasterModule } from './merchandiser-master/merchandiser-master.module';
import { ProductMasterModule } from './product-master/product-master.module';
import { OutletMasterModule } from './outlet-master/outlet-master.module';
import { CustomerMasterModule } from './customer-master/customer-master.module';
import { AssetSupplierMasterModule } from './asset-supplier-master/asset-supplier-master.module';
import { AssetTypeMasterModule } from './asset-type-master/asset-type-master.module';

import { routing } from './master-data.routing';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		MerchandiserMasterModule,
		ProductMasterModule,
		OutletMasterModule,
		GeographyMasterModule,
		CustomerMasterModule,
		AssetSupplierMasterModule,
		AssetTypeMasterModule
	],
})

export class MasterDataModule {}

