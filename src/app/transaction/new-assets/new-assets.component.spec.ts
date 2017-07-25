import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetsComponent } from './new-assets.component';

describe('NewAssetsComponent', () => {
  let component: NewAssetsComponent;
  let fixture: ComponentFixture<NewAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
