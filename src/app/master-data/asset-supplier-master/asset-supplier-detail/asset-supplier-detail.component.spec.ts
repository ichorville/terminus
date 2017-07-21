import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplierDetailComponent } from './asset-supplier-detail.component';

describe('AssetSupplierDetailComponent', () => {
  let component: AssetSupplierDetailComponent;
  let fixture: ComponentFixture<AssetSupplierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSupplierDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSupplierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
