import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryInfoEditorComponent } from './query-info-editor.component';

describe('QueryInfoEditorComponent', () => {
  let component: QueryInfoEditorComponent;
  let fixture: ComponentFixture<QueryInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryInfoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
