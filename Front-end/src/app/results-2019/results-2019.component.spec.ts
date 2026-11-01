import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Results2019Component } from './results-2019.component';

describe('Results2019Component', () => {
  let component: Results2019Component;
  let fixture: ComponentFixture<Results2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Results2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Results2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
