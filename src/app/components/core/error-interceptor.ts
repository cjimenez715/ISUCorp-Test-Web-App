import { ServerErrorType } from './../models/server-error-type';
import { ErrorService } from './services/error-service.service';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NotificationManagerService } from './services/notification-manager-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(resp => {
        if (resp instanceof HttpErrorResponse) {
          this.handleError(resp);
        }
        return throwError(resp);
      })
    );
  }

  handleError(error: HttpErrorResponse): void {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationManagerService);
    let message: string;

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case ServerErrorType._409:
          message = errorService.getServerErrorMessage(error);
          notifier.showError(message);
          break;
        default:
          message = error?.message;
          notifier.showError(message);
          break;
      }
    } else {
      message = errorService.getClientErrorMessage(error);
      if (message.toLowerCase().includes('cannot match any routes')) {
        this.router.navigate(['search-reservation']);
      }
    }
  }
}
