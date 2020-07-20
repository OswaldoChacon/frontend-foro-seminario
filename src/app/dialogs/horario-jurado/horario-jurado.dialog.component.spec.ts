import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioJuradoDialogComponent } from './horario-jurado.dialog.component';

describe('JuradoComponent', () => {
  let component: HorarioJuradoDialogComponent;
  let fixture: ComponentFixture<HorarioJuradoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioJuradoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioJuradoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
