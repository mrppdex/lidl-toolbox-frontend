import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ComponentPortal } from '@angular/cdk/portal';

import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { PluComponent } from './plu/plu.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  userPortal: ComponentPortal<UserComponent>;
  pluPortal: ComponentPortal<PluComponent>;

  constructor() {
  }

  ngAfterViewInit(): void {
    of(new ComponentPortal(UserComponent))
    .pipe(
      delay(0),
      tap(result => {
          this.userPortal = result;
        }
      )
    ).subscribe();

    of(new ComponentPortal(PluComponent))
    .pipe(
      delay(0),
      tap(result => {
          this.pluPortal = result;
        }
      )
    ).subscribe();
  }

  ngOnInit() {
  }

}
