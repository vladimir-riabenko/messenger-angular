import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = req.clone({
        url: `https://localhost:44309/${req.url}`
      });

    apiReq = apiReq.clone({
      setHeaders: {
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
    return next.handle(apiReq);
  }
}
