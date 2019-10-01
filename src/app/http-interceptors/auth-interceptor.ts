import { LoginService } from '../login.service';
import { Router } from '@angular/router';

import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log('inside interceport');

    const loginService = this.injector.get(LoginService);
    const router = this.injector.get(Router);

    // loginService.securityToken = 'nic';
    // if (!!loginService.securityToken) {
    //     loginService.securityToken.subscribe( token => {
    //       console.log('Interceptor: ' + loginService.securityToken);
    //       const clonedRequest = req.clone({ setHeaders: { 'x-auth-token': token} });
    //       return next.handle(clonedRequest);
    //     });
    // }
    return next.handle(req);
  }

  constructor(private injector: Injector, private router: Router) {}
}

