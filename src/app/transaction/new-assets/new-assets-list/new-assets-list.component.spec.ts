import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetsListComponent } from './new-assets-list.component';

describe('NewAssetsListComponent', () => {
  let component: NewAssetsListComponent;
  let fixture: ComponentFixture<NewAssetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
