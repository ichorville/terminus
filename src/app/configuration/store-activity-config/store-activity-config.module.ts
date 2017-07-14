
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../../shared/data-table/data-table.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { AlertModule } from '../../shared/alert/alert.module';

/*import { OutletMasterComponent } from './outlet-master.component'; 

import { OutletAddComponent } from './outlet-add/outlet-add.component';
import { OutletEditComponent } from './outlet-edit/outlet-edit.component';
import { OutletDetailComponent } from './outlet-detail/outlet-detail.component';

import { OutletMasterService } from './outlet-master.service';*/

import { routing } from './store-activity-config.routing';
import { StoreActivityListComponent } from './store-activity-list/store-activity-list.component';
import { StoreActivityAddComponent } from './store-activity-add/store-activity-add.component';
import {StoreActivityConfigService} from './store-activity-config.service';
import { StoreActivityEditComponent } from './store-activity-edit/store-activity-edit.component';

@NgModule({
	imports: [
		CommonModule,
		routing,
		DataTableModule,
		DynamicFormModule,
		AlertModule,
	],
	declarations: [
        StoreActivityAddComponent,
	    StoreActivityListComponent,
	    StoreActivityEditComponent
    ],
	providers: [ StoreActivityConfigService
	]
})

export class StoreActivityConfigModule {}



