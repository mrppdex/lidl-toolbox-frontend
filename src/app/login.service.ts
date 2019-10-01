import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, from, of} from 'rxjs';
import { catchError} from 'rxjs/operators';

import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { CompileShallowModuleMetadata } from '@angular/compiler';

import { ErrorDialogService, DialogData } from './error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  email: string;
  securityToken: string;
  httpResponse: any; // HttpResponse<string>;
  httpAjaxResponse: any;
  error: string;
  inProgress: Promise<any>;

  login(email, password): Observable<any> {
    this.error = undefined;
    const user = {
      email,
      password
    };
    console.log(user);

    return from(this.http.post<any>(
      'http://localhost:3000/api/auth/',
      user, {observe: 'response'}).pipe(
        catchError((err) => {
          const data: DialogData = {
            title: err.status,
            message: err.error
          };
          this.eds.show(data);
          return of(err);
        })
      ));

  }

  constructor(
    private http: HttpClient,
    private eds: ErrorDialogService) {
    }
}
