import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForosDialogComponent } from './foros.dialog.component';

describe('ForosComponent', () => {
  let component: ForosDialogComponent;
  let fixture: ComponentFixture<ForosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
