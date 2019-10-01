import { PermissionsService } from '../permissions.service';
import { LoginService } from '../login.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private permissionsService: PermissionsService,
    private router: Router) { }

  ngOnInit() {
    if (!this.permissionsService.role) {
      this.router.navigate(['/login']);
    }
  }

}
