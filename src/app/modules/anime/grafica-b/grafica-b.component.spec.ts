import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBComponent } from './grafica-b.component';

describe('GraficaBComponent', () => {
  let component: GraficaBComponent;
  let fixture: ComponentFixture<GraficaBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
