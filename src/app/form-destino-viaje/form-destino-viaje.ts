import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.models';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino-viaje',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css'
})

export class FormDestinoViaje implements AfterViewInit {
  searchResults: string[] = [];

  readonly destinosDisponibles: string[] = [
  'Barcelona',
  'Barranquilla',
  'Buenos Aires',
  'Madrid',
  'Lima',
  'Londres',
  'Los Ángeles',
  'París',
  'Roma',
  'Bogotá',
  'Cartagena',
  'Medellín',
  'Tegucigalpa',
  'San Pedro Sula',
  'Roatán'
];

  @Output() onItemAdded = new EventEmitter<DestinoViaje>();

  fg: FormGroup;

  minLongitud = 3;

  // Primer validador: mínimo 5 caracteres
  nombreValidator(control: AbstractControl): ValidationErrors | null {

    const longitud = (control.value ?? '').toString().trim().length;

    if (longitud > 0 && longitud < 5) {
      return { invalidNombre: true };
    }

    return null;
  }

  // Segundo validador: longitud mínima configurable
  nombreValidatorParametrizable(minLong: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      const longitud = (control.value ?? '').toString().trim().length;

      if (longitud > 0 && longitud < minLong) {
        return { minLongNombre: true };
      }

      return null;
    };
  }

  constructor(private fb: FormBuilder) {

    this.fg = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['', Validators.required]
    });

    this.fg.valueChanges.subscribe(valor => {
      console.log('Cambios en el formulario:', valor);
    });
  }

ngAfterViewInit(): void {

  const elemNombre = document.getElementById('nombre') as HTMLInputElement;

  if (elemNombre) {

    fromEvent<InputEvent>(elemNombre, 'input')
      .pipe(

        map(event => (event.target as HTMLInputElement).value),

        debounceTime(200),

        distinctUntilChanged(),

        map(texto => {

          if (texto.trim().length < 4) {
            return [];
          }

          return this.destinosDisponibles.filter(destino =>
            destino.toLowerCase().includes(texto.trim().toLowerCase())
          );

        })

      )
      .subscribe(resultados => {

        this.searchResults = resultados;

        console.log('Sugerencias encontradas:', resultados);

      });

  }

}


  guardar(): void {

    const nombre = this.fg.controls['nombre'].value;
    const url = this.fg.controls['url'].value;

    if (this.fg.valid && nombre.trim() !== '') {

      const destino = new DestinoViaje(nombre.trim(), url.trim());

      this.onItemAdded.emit(destino);

      this.fg.reset();
    }
  }
}