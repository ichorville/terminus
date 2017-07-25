import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetsAddComponent } from './new-assets-add.component';

describe('NewAssetsAddComponent', () => {
  let component: NewAssetsAddComponent;
  let fixture: ComponentFixture<NewAssetsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
