import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductGroupModule } from './product-group/product-group.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductConfigComponent } from './product-config.component';

import { routing } from './product-config.routing';

@NgModule({
	imports: [
		routing,
		ProductGroupModule,
		ProductTypeModule,
		ProductCategoryModule
	],
	declarations: [
		ProductConfigComponent
	]
})

export class ProductConfigModule {}

