import { DestinosApiClient } from './destinos-api-client';

export abstract class DestinosApiClientViejo {
  abstract agregar: DestinosApiClient['agregar'];
  abstract elegir: DestinosApiClient['elegir'];
  abstract eliminar: DestinosApiClient['eliminar'];
}