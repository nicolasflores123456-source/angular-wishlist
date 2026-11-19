import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DestinosApiClient } from './destinos-api-client';

describe('DestinosApiClient', () => {

  let service: DestinosApiClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });

    service = TestBed.inject(DestinosApiClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});