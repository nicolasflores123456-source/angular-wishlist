# Angular Wishlist – Gestión de Destinos Turísticos

## Descripción

Aplicación web de página única (SPA) desarrollada con Angular 22 y TypeScript como parte del curso Desarrollo de páginas web con Angular de Coursera.

El proyecto permite administrar destinos turísticos, seleccionar favoritos y realizar votaciones mediante un sistema de gestión de estado con NgRx.

## Tecnologías utilizadas

- Angular 22
- TypeScript
- HTML5 y CSS3
- Bootstrap
- RxJS
- NgRx Store
- NgRx Effects
- Redux DevTools
- Angular Router
- Formularios reactivos

## Funcionalidades

### 1. Arquitectura basada en componentes
La aplicación utiliza componentes independientes para presentar destinos, administrar listados y gestionar formularios.

### 2. Navegación SPA
Implementación de rutas mediante Angular Router, incluyendo redirecciones y navegación entre componentes.

### 3. Formularios reactivos
Formulario para agregar destinos turísticos con:

- Validaciones obligatorias.
- Validaciones personalizadas.
- Validaciones parametrizables.
- Mensajes de error.
- Sugerencias de destinos mediante RxJS.

### 4. Comunicación entre componentes
Implementación de `@Input`, `@Output` y `EventEmitter`.

### 5. Gestión de estado con NgRx
Administración centralizada de destinos mediante:

- Actions.
- Reducers.
- Effects.
- Store.

### 6. Sistema de votación
Cada destino cuenta con botones para incrementar y disminuir votos.

También incluye una opción para reiniciar todos los contadores a cero.

### 7. Redux DevTools
Integración con Redux DevTools para visualizar acciones y cambios del estado global.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/nicolasflores123456-source/angular-wishlist.git
```

Entrar en el proyecto:

```bash
cd angular-wishlist
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npx ng serve -o
```

La aplicación estará disponible en el navegador mediante `http://localhost:4200`.

## Compilación

Para generar la versión de producción:

```bash
npx ng build
```

## Evaluación académica

Proyecto desarrollado para demostrar los conocimientos adquiridos durante el módulo 2 del curso Desarrollo de páginas web con Angular.

Incluye arquitectura basada en componentes, formularios reactivos, navegación SPA, comunicación entre componentes y gestión de estado mediante NgRx.

## Autor

Nicolás Flores

## Curso

Desarrollo de páginas web con Angular – Coursera.