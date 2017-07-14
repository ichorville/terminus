/* tslint:disable:no-unused-variable */

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Location, LocationStrategy } from '@angular/common';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('App: NestleMerchandiserApp', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			schemas:[
				NO_ERRORS_SCHEMA
			],
			providers:[
				{
					provide: Location,
					useClass: LocationStrategy
				}
			]
		}).compileComponents().then(() => {
			fixture = TestBed.createComponent(AppComponent);
			comp = fixture.componentInstance;
		});
	}));

	tests();
});

function tests() {
	it('can instantiate it', () => {
		expect(comp).not.toBeNull();
	});
}
