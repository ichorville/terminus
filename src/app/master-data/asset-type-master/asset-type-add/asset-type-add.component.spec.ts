import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeAddComponent } from './asset-type-add.component';

describe('AssetTypeAddComponent', () => {
  let component: AssetTypeAddComponent;
  let fixture: ComponentFixture<AssetTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
