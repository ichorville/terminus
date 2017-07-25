import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetsDetailComponent } from './new-assets-detail.component';

describe('NewAssetsDetailComponent', () => {
  let component: NewAssetsDetailComponent;
  let fixture: ComponentFixture<NewAssetsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssetsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssetsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
