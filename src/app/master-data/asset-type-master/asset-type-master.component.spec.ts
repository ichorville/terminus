import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeMasterComponent } from './asset-type-master.component';

describe('AssetTypeMasterComponent', () => {
  let component: AssetTypeMasterComponent;
  let fixture: ComponentFixture<AssetTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
