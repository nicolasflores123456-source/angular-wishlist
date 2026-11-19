import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { DestinoViaje } from './destino-viaje';

describe('DestinoViaje', () => {

  let component: DestinoViaje;
  let fixture: ComponentFixture<DestinoViaje>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DestinoViaje],

      providers: [
        provideMockStore(),
        provideRouter([])
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(DestinoViaje);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});