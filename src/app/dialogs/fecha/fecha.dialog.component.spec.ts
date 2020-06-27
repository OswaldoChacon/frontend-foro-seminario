import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaDialogComponent } from './fecha.dialog.component';

describe('FechaDialogComponent', () => {
  let component: FechaDialogComponent;
  let fixture: ComponentFixture<FechaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
