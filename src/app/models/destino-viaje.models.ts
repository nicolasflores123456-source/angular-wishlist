export class DestinoViaje {
  votes: number = 0;
  public servicios: string[];

  constructor(
    public nombre: string,
    public imagenUrl: string
  ) {
    this.servicios = ['piscina', 'desayuno'];
  }

}