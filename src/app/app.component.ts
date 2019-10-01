import { Component } from '@angular/core';
import { PermissionsService } from './permissions.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';

  identify(index, id) {
    console.log(index + ' and ' + id);
    return this.ls.inProgress;
  }

  get perm() {
    return this.ps.permTable;
  }

  get role() {
    return this.ps.role;
  }
  constructor(private ps: PermissionsService, private ls: LoginService) {
    ps.getRole();
  }
}
