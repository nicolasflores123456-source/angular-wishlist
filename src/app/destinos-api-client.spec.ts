import { TestBed } from '@angular/core/testing';
import { DestinosApiClient } from './destinos-api-client';

describe('DestinosApiClient', () => {
  let service: DestinosApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinosApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
