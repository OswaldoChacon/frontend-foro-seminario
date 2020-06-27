import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioJuradoComponent } from './horario-jurado.component';

describe('HorarioJuradoComponent', () => {
  let component: HorarioJuradoComponent;
  let fixture: ComponentFixture<HorarioJuradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioJuradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
