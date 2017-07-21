import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplierAddComponent } from './asset-supplier-add.component';

describe('AssetSupplierAddComponent', () => {
  let component: AssetSupplierAddComponent;
  let fixture: ComponentFixture<AssetSupplierAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSupplierAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSupplierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
