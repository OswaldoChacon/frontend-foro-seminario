import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDialogComponent } from './linea.dialog.component';

describe('LineaDialogComponent', () => {
  let component: LineaDialogComponent;
  let fixture: ComponentFixture<LineaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
