import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsEditorComponent } from './polls-editor.component';

describe('PollsEditorComponent', () => {
  let component: PollsEditorComponent;
  let fixture: ComponentFixture<PollsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
