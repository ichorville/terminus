import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequestFormComponent } from './asset-request-form.component';

describe('AssetRequestFormComponent', () => {
  let component: AssetRequestFormComponent;
  let fixture: ComponentFixture<AssetRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
