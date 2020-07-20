import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarHorarioComponent } from './generar-horario.component';

describe('HorarioComponent', () => {
  let component: GenerarHorarioComponent;
  let fixture: ComponentFixture<GenerarHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
