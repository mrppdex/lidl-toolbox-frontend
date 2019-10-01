import { httpInterceptorProviders } from './http-interceptors/index';

import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {PortalModule} from '@angular/cdk/portal';

import { ErrorDialogService } from './error-dialog.service';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DiscountComponent } from './discount/discount.component';
import { CdateComponent } from './cdate/cdate.component';
import { AdminComponent } from './admin/admin.component';
import { AdminComponentPhotoDialogComponent, PluComponent as AdminPluComponent } from './admin/plu/plu.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { UserComponent } from './admin/user/user.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DiscountComponent,
    CdateComponent,
    AdminComponent,
    AdminComponentPhotoDialogComponent,
    AdminPluComponent,
    ErrorDialogComponent,
    UserComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    PortalModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AdminComponentPhotoDialogComponent,
    ErrorDialogComponent,
    AdminPluComponent,
    UserComponent
  ],
  providers: [ErrorDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
