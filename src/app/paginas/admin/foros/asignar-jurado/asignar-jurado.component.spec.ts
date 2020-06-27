import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarJuradoComponent } from './asignar-jurado.component';

describe('AsignarJuradoComponent', () => {
  let component: AsignarJuradoComponent;
  let fixture: ComponentFixture<AsignarJuradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarJuradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
