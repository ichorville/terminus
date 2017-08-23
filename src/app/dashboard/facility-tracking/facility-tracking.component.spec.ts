import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityTrackingComponent } from './facility-tracking.component';

describe('FacilityTrackingComponent', () => {
  let component: FacilityTrackingComponent;
  let fixture: ComponentFixture<FacilityTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
