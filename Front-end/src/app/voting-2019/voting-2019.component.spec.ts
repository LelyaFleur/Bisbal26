import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Voting2019Component } from './voting-2019.component';

describe('Voting2019Component', () => {
  let component: Voting2019Component;
  let fixture: ComponentFixture<Voting2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Voting2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Voting2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
