import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesSolicitudComponent } from './roles-solicitud.component';

describe('RolesSolicitudComponent', () => {
  let component: RolesSolicitudComponent;
  let fixture: ComponentFixture<RolesSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
