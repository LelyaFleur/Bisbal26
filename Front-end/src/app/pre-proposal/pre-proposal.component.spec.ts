import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProposalComponent } from './pre-proposal.component';

describe('PreProposalComponent', () => {
  let component: PreProposalComponent;
  let fixture: ComponentFixture<PreProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
