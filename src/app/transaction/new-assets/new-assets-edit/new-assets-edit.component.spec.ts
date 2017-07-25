import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetsEditComponent } from './new-assets-edit.component';

describe('NewAssetsEditComponent', () => {
  let component: NewAssetsEditComponent;
  let fixture: ComponentFixture<NewAssetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
