import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuradoDialogComponent } from './jurado.dialog.component';

describe('JuradoComponent', () => {
  let component: JuradoDialogComponent;
  let fixture: ComponentFixture<JuradoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuradoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuradoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
