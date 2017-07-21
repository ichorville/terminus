import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeDetailComponent } from './asset-type-detail.component';

describe('AssetTypeDetailComponent', () => {
  let component: AssetTypeDetailComponent;
  let fixture: ComponentFixture<AssetTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
