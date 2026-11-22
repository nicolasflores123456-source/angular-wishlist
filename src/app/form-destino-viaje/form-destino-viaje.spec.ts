import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDestinoViaje } from './form-destino-viaje';

import {
  APP_CONFIG,
  APP_CONFIG_VALUE
} from '../app-config';

describe('FormDestinoViaje', () => {

  let component: FormDestinoViaje;
  let fixture: ComponentFixture<FormDestinoViaje>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [FormDestinoViaje],

      providers: [
        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(FormDestinoViaje);

    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});