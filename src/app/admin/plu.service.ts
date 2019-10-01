import { environment as env } from '../../environments/environment';
import { LoginService } from '../login.service';
import { DialogData, ErrorDialogService } from '../error-dialog.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { retry, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Product {
  _id: string;
  barcode: string;
  plu: number;
  name: string;
  url: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PluService {
  httpOptions = undefined;

  products: Product[];
  apiEnd = '/api/plu/';

  getAllProducts() {
    return this.http.get<any>(env.backend + this.apiEnd).pipe(
      retry(4),
      tap(error => console.log(error)));
  }

  deleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.loginService.securityToken
      })
    };
    return this.http.delete(env.backend + this.apiEnd + id, httpOptions);
  }

  addProduct(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.loginService.securityToken
      })
    };
    console.log('addProduct');
    console.log(product);
    if (product) {
      return this.http.post<any>(env.backend + this.apiEnd, product, httpOptions).pipe(
        retry(4),
        catchError( err => {
          const data: DialogData = {
            title: err.status,
            message: err.error.errmsg || err.error
          };
          this.eds.show(data);
          return of(err);
        }
      )
    );
  }
}

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private eds: ErrorDialogService) {
  }
}
