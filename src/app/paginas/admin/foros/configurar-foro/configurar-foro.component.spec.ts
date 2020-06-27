import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarForoComponent } from './configurar-foro.component';

describe('ConfigurarForoComponent', () => {
  let component: ConfigurarForoComponent;
  let fixture: ComponentFixture<ConfigurarForoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarForoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
