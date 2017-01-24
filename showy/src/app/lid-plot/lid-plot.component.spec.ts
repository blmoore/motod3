/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LidPlotComponent } from './lid-plot.component';

describe('LidPlotComponent', () => {
  let component: LidPlotComponent;
  let fixture: ComponentFixture<LidPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LidPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LidPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
