import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDialogComponent } from './foro.dialog.component';

describe('ForosComponent', () => {
  let component: ForoDialogComponent;
  let fixture: ComponentFixture<ForoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
