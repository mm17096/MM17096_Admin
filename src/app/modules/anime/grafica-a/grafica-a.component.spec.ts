import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaAComponent } from './grafica-a.component';

describe('GraficaAComponent', () => {
  let component: GraficaAComponent;
  let fixture: ComponentFixture<GraficaAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
