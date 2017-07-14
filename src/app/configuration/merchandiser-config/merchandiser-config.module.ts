import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { SimpleSearchModule } from '../../shared/simple-search-box/simple-search-box.module';
import { NavTabsModule } from '../../shared/nav-tabs/nav-tabs.module';

import { ProductsComponent } from './products/products.component';
import { OutletsComponent } from './outlets/outlets.component';
import { MerchandiserConfigNavTabComponent } from './merchandiser-config-nav-tab/merchandiser-config-nav-tab.component';
import { MerchandiserConfigMappingTableComponent } from './merchandiser-config-mapping-table/merchandiser-config-mapping-table.component';

import { routing } from './merchandiser-config.routing';
import { MerchandiserConfigService } from './merchandiser-config.service';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		DataTableModule,
		NavTabsModule,
		SimpleSearchModule,	
	],
	declarations: [
		ProductsComponent,
		OutletsComponent,
		MerchandiserConfigNavTabComponent,
		MerchandiserConfigMappingTableComponent
	],
	providers: [
		MerchandiserConfigService
	]
})

export class MerchandiserConfigModule {}