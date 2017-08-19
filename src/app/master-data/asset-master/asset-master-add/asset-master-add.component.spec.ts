import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMasterAddComponent } from './asset-master-add.component';

describe('AssetMasterAddComponent', () => {
  let component: AssetMasterAddComponent;
  let fixture: ComponentFixture<AssetMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
