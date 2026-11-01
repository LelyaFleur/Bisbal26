import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proposal2019Component } from './proposal-2019.component';

describe('ProposalComponent', () => {
  let component: Proposal2019Component;
  let fixture: ComponentFixture<Proposal2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proposal2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proposal2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
