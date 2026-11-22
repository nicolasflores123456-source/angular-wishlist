import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { provideRouter } from '@angular/router';

import { ListaDestinos } from './lista-destinos';

import {
  APP_CONFIG,
  APP_CONFIG_VALUE
} from '../app-config';

describe('ListaDestinos', () => {

  let component: ListaDestinos;
  let fixture: ComponentFixture<ListaDestinos>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [ListaDestinos],

      providers: [

        provideRouter([]),

        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE
        },

        provideMockStore({
          initialState: {
            destinos: {
              items: [],
              favorito: null
            }
          }
        })

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(ListaDestinos);

    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});