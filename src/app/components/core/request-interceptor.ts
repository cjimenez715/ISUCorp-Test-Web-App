import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Inject, LOCALE_ID } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private cultures = [
    { id: 'en-US', value: 'en-US' },
    { id: 'es', value: 'es-BO' }
  ];

  constructor(@Inject(LOCALE_ID) protected localeId: string) { }

  private getLanguage(): string {
    return this.cultures.find(c => c.id === this.localeId).value;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        'Accept-Language': this.getLanguage()
      }
    });
    return next.handle(request);
  }
}
