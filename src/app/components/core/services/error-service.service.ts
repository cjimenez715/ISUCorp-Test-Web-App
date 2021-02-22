import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    const data = this.getExceptions(error);
    return navigator.onLine ?
      data ? data.join('\n') : error.message :
      $localize`No Internet Connection..`;
  }

  private getExceptions(error: HttpErrorResponse): any {
    if (error?.error?.errors) {
      return this.getErrorsMessagesByKey(this.getPropertyKeys(error.error.errors), error.error.errors);
    }
  }

  private getPropertyKeys(errors: any): any {
    return Object.keys(errors);
  }

  private getErrorsMessagesByKey(keys: any, errors: any): any {
    let data = [];
    keys.forEach(key => {
      data = data.concat(errors[key]);
    });
    return data;
  }
}
