import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Voting2018Component } from './voting-2018.component';

describe('Voting2019Component', () => {
  let component: Voting2018Component;
  let fixture: ComponentFixture<Voting2018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Voting2018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Voting2018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
