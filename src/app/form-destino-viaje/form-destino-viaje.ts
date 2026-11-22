import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy,
  inject
} from '@angular/core';

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

import { fromEvent, of, Subject } from 'rxjs';

import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  takeUntil
} from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { DestinoViaje } from '../models/destino-viaje.models';

import {
  APP_CONFIG,
  AppConfig
} from '../app-config';

@Component({
  selector: 'app-form-destino-viaje',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css'
})
export class FormDestinoViaje implements AfterViewInit, OnDestroy {

  private config = inject<AppConfig>(APP_CONFIG);

  private destroy$ = new Subject<void>();

  searchResults: string[] = [];

  @Output() onItemAdded = new EventEmitter<DestinoViaje>();

  fg: FormGroup;

  minLongitud = 3;

  // Validador: mínimo 5 caracteres
  nombreValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const longitud = (control.value ?? '')
      .toString()
      .trim()
      .length;

    if (longitud > 0 && longitud < 5) {
      return { invalidNombre: true };
    }

    return null;
  }

  // Validador parametrizable
  nombreValidatorParametrizable(
    minLong: number
  ): ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const longitud = (control.value ?? '')
        .toString()
        .trim()
        .length;

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
        this.nombreValidatorParametrizable(
          this.minLongitud
        )
      ])],

      url: ['', Validators.required]
    });

    this.fg.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(valor => {
        console.log(
          'Cambios en el formulario:',
          valor
        );
      });
  }

  ngAfterViewInit(): void {

    const elemNombre = document.getElementById(
      'nombre'
    ) as HTMLInputElement;

    if (!elemNombre) {
      return;
    }

    fromEvent<InputEvent>(elemNombre, 'input')
      .pipe(

        map(event =>
          (event.target as HTMLInputElement).value.trim()
        ),

        debounceTime(200),

        distinctUntilChanged(),

        switchMap(texto => {

          if (texto.length < 3) {
            return of([]);
          }

          const url =
            `${this.config.apiEndpoint}/ciudades?q=${
              encodeURIComponent(texto)
            }`;

          return ajax.getJSON<string[]>(url)
            .pipe(
              catchError(error => {
                console.error(
                  'Error al consultar ciudades:',
                  error
                );

                return of([]);
              })
            );
        }),

        takeUntil(this.destroy$)

      )
      .subscribe(resultados => {

        this.searchResults = resultados;

        console.log(
          'Sugerencias desde Express:',
          resultados
        );
      });
  }

  guardar(): void {

    const nombre = this.fg.controls['nombre'].value;
    const url = this.fg.controls['url'].value;

    if (this.fg.valid && nombre.trim() !== '') {

      const destino = new DestinoViaje(
        nombre.trim(),
        url.trim()
      );

      this.onItemAdded.emit(destino);

      this.fg.reset();

      this.searchResults = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}