import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplierMasterComponent } from './asset-supplier-master.component';

describe('AssetSupplierMasterComponent', () => {
  let component: AssetSupplierMasterComponent;
  let fixture: ComponentFixture<AssetSupplierMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSupplierMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSupplierMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
