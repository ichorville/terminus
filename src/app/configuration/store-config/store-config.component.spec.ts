/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StoreConfigComponent } from './store-config.component';

describe('StoreConfigComponent', () => {
  let component: StoreConfigComponent;
  let fixture: ComponentFixture<StoreConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
