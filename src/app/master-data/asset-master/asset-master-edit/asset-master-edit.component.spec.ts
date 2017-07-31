import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMasterEditComponent } from './asset-master-edit.component';

describe('AssetMasterEditComponent', () => {
  let component: AssetMasterEditComponent;
  let fixture: ComponentFixture<AssetMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
