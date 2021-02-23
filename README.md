# ISUCorpTestWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development Settings
Current Server Url is hardcoded. BackEnd is correctly configured as `https://localhost:5001`, but change it if it is necessary.
File: contact.service.ts

```typescript
  export class ContactService {

  private baseUrl = https://localhost:5001/api/contact;```
  
File: reservation.service.ts
```typescript
export class ReservationService {

  private baseUrl = https://localhost:5001/api/reservation;```

## Development server en-US

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server es-BO

Run `ng serve --configuration=es` for a dev server. Navigate to `http://localhost:4200/`. The app will be translated to Spanish.


## Build

Run `npm run build-locale` to build the project for both languages. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
