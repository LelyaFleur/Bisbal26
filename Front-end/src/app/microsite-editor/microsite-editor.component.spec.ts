import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrositeEditorComponent } from './microsite-editor.component';

describe('EditMicrositeComponent', () => {
  let component: MicrositeEditorComponent;
  let fixture: ComponentFixture<MicrositeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrositeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrositeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
