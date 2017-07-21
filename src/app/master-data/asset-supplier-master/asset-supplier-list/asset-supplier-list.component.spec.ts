import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSupplierListComponent } from './asset-supplier-list.component';

describe('AssetSupplierListComponent', () => {
  let component: AssetSupplierListComponent;
  let fixture: ComponentFixture<AssetSupplierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSupplierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
