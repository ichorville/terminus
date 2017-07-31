import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMasterDetailsComponent } from './asset-master-details.component';

describe('AssetMasterDetailsComponent', () => {
  let component: AssetMasterDetailsComponent;
  let fixture: ComponentFixture<AssetMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
