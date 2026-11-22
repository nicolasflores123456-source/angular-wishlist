import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DestinosApiClient } from './destinos-api-client';

import {
  APP_CONFIG,
  APP_CONFIG_VALUE
} from './app-config';

describe('DestinosApiClient', () => {

  let service: DestinosApiClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        DestinosApiClient,

        provideHttpClient(),
        provideHttpClientTesting(),

        provideMockStore({
          initialState: {
            destinos: {
              items: [],
              loading: false,
              favorito: null
            }
          }
        }),

        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE
        }
      ]
    });

    service = TestBed.inject(DestinosApiClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});