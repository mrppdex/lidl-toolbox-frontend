import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { PluComponent as AdminPluComponent } from './admin/plu/plu.component';
import { UserComponent as AdminUserComponent } from './admin/user/user.component';

import { DiscountComponent } from './discount/discount.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CdateComponent } from './cdate/cdate.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'cdate', component: CdateComponent },
  { path: 'game', component: GameComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
