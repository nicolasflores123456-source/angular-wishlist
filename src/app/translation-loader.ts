import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable, firstValueFrom } from 'rxjs';

import { APP_CONFIG } from './app-config';
import { MyDatabase, Traduccion } from './my-database';

@Injectable()
export class CustomTranslationLoader implements TranslateLoader {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  private db = inject(MyDatabase);

  getTranslation(lang: string): Observable<Record<string, string>> {
    return from(this.cargarTraducciones(lang));
  }

  private async cargarTraducciones(
    lenguaje: string
  ): Promise<Record<string, string>> {

    // Buscar primero en IndexedDB
    let traducciones: Traduccion[] = await this.db.translations
      .where('lenguaje')
      .equals(lenguaje)
      .toArray();

    if (traducciones.length > 0) {

      console.log(
        'Traducciones recuperadas desde IndexedDB:',
        lenguaje
      );

    } else {

      // Si no existen localmente, consultar Express
      traducciones = await firstValueFrom(
        this.http.get<Traduccion[]>(
          `${this.config.apiEndpoint}/translations`,
          {
            params: { lang: lenguaje }
          }
        )
      );

      // Guardar las traducciones descargadas
      await this.db.translations.bulkAdd(traducciones);

      console.log(
        'Traducciones descargadas desde Express:',
        lenguaje
      );
    }

    // Convertir al formato esperado por ngx-translate
    return traducciones.reduce(
      (resultado, traduccion) => {

        resultado[traduccion.key] = traduccion.value;

        return resultado;
      },
      {} as Record<string, string>
    );
  }
}