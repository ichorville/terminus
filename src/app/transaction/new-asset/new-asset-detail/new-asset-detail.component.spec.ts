import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetDetailComponent } from './new-asset-detail.component';

describe('NewAssetDetailComponent', () => {
  let component: NewAssetDetailComponent;
  let fixture: ComponentFixture<NewAssetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
