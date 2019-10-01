import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { PermissionsService } from '../permissions.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorDialogService, DialogData } from '../error-dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  response: string;

  getEmailError(): string {
    return JSON.stringify(this.loginForm.get('email').errors);
  }

  getPasswordError(): string {
    return JSON.stringify(this.loginForm.get('password').errors);
  }

  onSubmit() {
    // this.loginForm.reset();
    // this.response = JSON.stringify(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
        ).subscribe(result => {
          if (result instanceof HttpResponse) {
            this.loginService.securityToken = result.body.token;
            console.log(this.loginService.securityToken);
            console.log(result);
            this.ps.getRole();
            this.router.navigate(['/']);
          } else {
            this.loginService.error = result.error;
          }
        });
    }
  }

  constructor(
    private loginService: LoginService,
    private ps: PermissionsService,
    private router: Router,
    private eds: ErrorDialogService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm.valueChanges.subscribe({
      next(val) { this.response = val;  },
      error(msg) { this.response = msg; }
    });
  }

  get emailErrors(): any {
    return this.loginForm.get('email').errors;
  }

  get passwordErrors(): any {
    return this.loginForm.get('password').errors;
  }

}
