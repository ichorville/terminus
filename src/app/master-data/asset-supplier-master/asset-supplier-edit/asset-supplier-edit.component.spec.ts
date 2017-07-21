import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplierEditComponent } from './asset-supplier-edit.component';

describe('AssetSupplierEditComponent', () => {
  let component: AssetSupplierEditComponent;
  let fixture: ComponentFixture<AssetSupplierEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSupplierEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSupplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
