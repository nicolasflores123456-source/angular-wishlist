import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DestinoDetalle } from './destino-detalle';

describe('DestinoDetalle', () => {
  let component: DestinoDetalle;
  let fixture: ComponentFixture<DestinoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoDetalle],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});