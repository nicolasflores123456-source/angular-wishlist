import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

import { ListaDestinos } from './lista-destinos';

describe('ListaDestinos', () => {

  let component: ListaDestinos;
  let fixture: ComponentFixture<ListaDestinos>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [ListaDestinos],

      providers: [
        provideRouter([]),

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