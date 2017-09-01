import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetAddComponent } from './new-asset-add.component';

describe('NewAssetAddComponent', () => {
  let component: NewAssetAddComponent;
  let fixture: ComponentFixture<NewAssetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
