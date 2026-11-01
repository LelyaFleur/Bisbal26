import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDialogComponent } from './historial-dialog.component';

describe('HistorialDialogComponent', () => {
  let component: HistorialDialogComponent;
  let fixture: ComponentFixture<HistorialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
