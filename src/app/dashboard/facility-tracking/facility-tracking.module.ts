import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityTrackingComponent } from './facility-tracking.component';
import { routing } from './facility-tracking.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [FacilityTrackingComponent],
  
})
export class FacilityTrackingModule { }
