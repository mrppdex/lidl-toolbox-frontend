import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  role;

  permTable = {
    ca: [
      { link: '/', label: 'Home' },
      { link: '/discount', label: 'Discount'},
      { link: '/cdate', label: 'C-Date' },
      { link: '/plu', label: 'PLUs'}
    ],
    admin: [
      { link: '/', label: 'Home'},
      { link: '/discount', label: 'Discount'},
      { link: '/cdate', label: 'C-Date' },
      { link: '/plu', label: 'PLUs' },
      { link: '/game', label: 'Game' },
      { link: '/admin', label: 'Admin' }
    ],
    master: [
      { link: '/admin', label: 'Admin' }
    ]
  };

  async getRole() {

    const tkn = this.ls.securityToken;

    try {
      this.role = JSON.parse(
        atob(tkn.split('.')[1])).role;
      console.log('PermissionsService: ' + this.role);
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }

  constructor(
    private ls: LoginService,
    private router: Router) {
  }
}
