import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaForosComponent } from './lista-foros.component';

describe('ListaForosComponent', () => {
  let component: ListaForosComponent;
  let fixture: ComponentFixture<ListaForosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaForosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaForosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
