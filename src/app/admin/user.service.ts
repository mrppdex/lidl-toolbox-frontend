import { environment as env } from '../../environments/environment';
import { LoginService } from '../login.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { retry, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DialogData, ErrorDialogService } from '../error-dialog.service';

export interface User {
  _id: string;
  email: string;
  store: number;
  role: string;
  password: string;
  checked: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = undefined;

  users: User[];
  apiEnd = '/api/user/';

  public getAllUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'applicaton/json',
        'x-auth-token': this.loginService.securityToken
      })
    };

    return this.http.get<User[]>(env.backend + this.apiEnd, httpOptions).pipe(
      retry(4),
      tap(error => console.log(error)));
  }

  deleteUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.loginService.securityToken
      })
    };
    return this.http.delete(env.backend + this.apiEnd + id, httpOptions);
  }

  addUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.loginService.securityToken
      })
    };
    console.log('addUser');
    console.log(user);
    if (user) {
      return this.http.post<any>(env.backend + this.apiEnd, user, httpOptions).pipe(
        retry(4),
        catchError( err => {
          const data: DialogData = {
            title: err.status,
            message: err.error
          };
          this.eds.show(data);

          return of(err);
        })
      );
    }
  }

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private eds: ErrorDialogService) {
  }
}
